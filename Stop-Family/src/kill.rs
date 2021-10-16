use sysinfo::{ProcessExt, Signal, System, SystemExt};

pub fn kill(filename: &str) {
  let s = System::new_all();
  for process in s.process_by_name(filename) {
    process.kill(Signal::Kill);
    println!(
      "Killed Process: {}, With PID: {}",
      process.exe().display(),
      process.pid()
    );
  }
}
