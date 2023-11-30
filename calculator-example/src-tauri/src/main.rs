// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn calculate_result(expression1 : String, expression2 : String, operator: char) -> String {

    let num1 : f64 = expression1.parse().unwrap();
    let num2 : f64 = expression2.parse().unwrap();

    let result = match operator {
        '+' => format!("{}", num1+num2),
        '-' => format!("{}", num1-num2),
        '*' => format!("{}", num1*num2),
        '/' => format!("{}", num1/num2),
        _ => "Sorry, incorrect expression".to_string()
    };

    return result;
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_result])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
