// #![windows_subsystem = "windows"]
mod is_admin;
mod kill;
use std::os::windows::process::CommandExt;
use std::process::Command;
use threadpool::ThreadPool;

fn main() {
  if is_admin::is_app_elevated() {
    let to_kill = "WpcMon.exe";

    let pool = ThreadPool::new(8);

    pool.execute(move || loop {
      kill::kill(to_kill);
    });

    pool.join();
  } else {
    Command::new("powershell")
      .args([
        "Start-Process",
        "-Verb",
        "RunAs",
        "-WindowStyle",
        "hidden",
        "-FilePath",
        &std::env::current_exe().unwrap().to_str().unwrap(),
      ])
      .creation_flags(0x08000000)
      .output()
      .expect("Failed To Elevate, Please Accept The UAC Prompt!");
  }
}
