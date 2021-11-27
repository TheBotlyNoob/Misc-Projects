use sysinfo::{ProcessExt, Signal, System, SystemExt};

pub fn kill(filename: &str) {
  for process in System::new_all().process_by_name(filename) {
    process.kill(Signal::Kill);
  }
}
