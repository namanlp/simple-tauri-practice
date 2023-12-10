// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]



// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn calculate_result(expression1 : String, expression2 : String, operator: char) -> f64 {

    let num1 : f64 = expression1.parse().unwrap();
    let num2 : f64 = expression2.parse().unwrap();

    let result = match operator {
        '+' => num1+num2,
        '-' => num1-num2,
        '*' => num1*num2,
        '/' => num1/num2,
        _ => 0.0
    };

    return result;
}


fn main() {
    #[cfg(debug_assertions)] // only enable instrumentation in development builds
    let devtools = devtools::init();

    let builder = tauri::Builder::default();

    #[cfg(debug_assertions)]
        let builder = builder.plugin(devtools);

    builder
        .run(tauri::generate_context!("./tauri.conf.json"))
        .expect("error while running tauri application");
}
