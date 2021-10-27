// #![windows_subsystem = "windows"]
mod is_admin;
mod kill;
use std::os::windows::process::CommandExt;
use std::process::Command;
use threadpool::ThreadPool;

fn main() {
  if is_admin::is_app_elevated() {
    let to_kill = vec!["WpcMon.exe", "WpcTok.exe", "RuntimeBroker.exe", "WpcUapApp.exe"];
	let mut threads = Vec::new();

    for _to_kill in to_kill {
	  let pool = ThreadPool::new(4);
	  
	  threads.push(pool);
	  
	  pool.execute(move || {
		loop {
		  kill::kill(_to_kill);
		  println!("{}", _to_kill);
		}
	  });
    }
	
	for thread in threads {
	  thread.join();
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