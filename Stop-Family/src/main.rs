// #![windows_subsystem = "windows"]
mod is_admin;
mod kill;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::thread::sleep;
use std::time::Duration;

fn main() {
  if is_admin::is_app_elevated() {
    loop {
      kill::kill("WpcMon.exe");

      sleep(Duration::from_secs(10));
    }
  } else {
    Command::new("powershell")
      .args([
        "Start-Process",
        "-Verb",
        "RunAs",
        "-WindowStyle",
        "hidden",
        "-FilePath",
        &*(std::env::current_exe().unwrap().to_str().unwrap()),
      ])
      .creation_flags(0x08000000)
      .output()
      .expect("Failed To Elevate, Please Accept The UAC Prompt!");
  }
}
