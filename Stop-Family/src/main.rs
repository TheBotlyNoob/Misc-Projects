// #![windows_subsystem = "windows"]
mod is_admin;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::thread::sleep;
use std::time::Duration;

fn main() {
  if is_admin::is_app_elevated() {
    loop {
      Command::new("cmd")
        .args(["/c", "taskkill", "/f", "/im", "WpcMon.exe"])
        .output()
        .expect("Failed To Kill `WpcMon.exe`!");

      sleep(Duration::from_secs(5));
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
        &*(std::env::current_exe()
          .unwrap()
          .into_os_string()
          .into_string()
          .unwrap()),
      ])
      .creation_flags(0x08000000)
      .output()
      .expect("Failed To Elevate, Please Accept The UAC Prompt!");
  }
}
