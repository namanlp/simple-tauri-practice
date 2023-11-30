// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn say_hello() {
    println!("Hello World!");
}

fn main() {

    println!("HELLO buddy");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    tauri::Builder::default()
        // This is where you pass in your commands
        .invoke_handler(tauri::generate_handler![say_hello])
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
