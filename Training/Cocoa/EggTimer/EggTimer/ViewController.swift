//
//  ViewController.swift
//  EggTimer
//
//  Created by Arnaud LEMAIRE on 30/06/2017.
//  Copyright © 2017 Arnaud LEMAIRE. All rights reserved.
//

import Cocoa
import AVFoundation

class ViewController: NSViewController {

    var eggTimer = EggTimer()
    var prefs = Preferences()
    var soundPlayer: AVAudioPlayer?

    @IBOutlet weak var resetButton: NSButtonCell!
    @IBOutlet weak var timeLeftField: NSTextField!
    @IBOutlet weak var eggImageView: NSImageView!
    @IBOutlet weak var startButton: NSButton!
    @IBOutlet weak var stopButton: NSButton!
    @IBAction func startButtonClicked(_ sender: Any) {
        if eggTimer.isPaused {
            eggTimer.resumeTimer()
        } else {
            eggTimer.duration = prefs.selectedTime
            eggTimer.startTimer()
        }
        prepareSound()
        configureButtonAndMenus()
    }
    @IBAction func stopButtonClicked(_ sender: Any) {
        eggTimer.stopTimer()
        configureButtonAndMenus()
    }
    @IBAction func resetButtonClicked(_ sender: Any) {
        eggTimer.resetTimer()
        updateDisplay(for: prefs.selectedTime)
        configureButtonAndMenus()
    }
    @IBAction func startTimeMenuItemSelected(_ sender: Any) {
        startButtonClicked(sender)
    }
    @IBAction func stopTimeMenuItemSelected(_ sender: Any) {
        stopButtonClicked(sender)
    }
    @IBAction func resetTimeMenuItemSelected(_ sender: Any) {
        resetButtonClicked(sender)
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        eggTimer.delegate = self
        setupPrefs()
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }

}

extension ViewController: EggTimerProtocol {
    
    func timeRemainingOnTimer(_ timer: EggTimer, timeRemaining: TimeInterval) {
        updateDisplay(for: timeRemaining)
    }
    
    func timerHasFinished(_ timer: EggTimer) {
        updateDisplay(for: 0)
        playSound()
    }
}

extension ViewController {
    func updateDisplay(for timeRemaining: TimeInterval) {
        timeLeftField.stringValue = textToDisplay(for: timeRemaining)
        eggImageView.image = imageToDisplay(for: timeRemaining)
    }
    
    private func textToDisplay(for timeRemaining: TimeInterval) -> String {
        if timeRemaining == 0 {
            return "Done!"
        }
        
        let minutesRemaining = floor(timeRemaining/60)
        let secondsRemaining = timeRemaining - (minutesRemaining * 60)
        
        let secondsDisplay = String(format: "%02d", Int(secondsRemaining))
        let timeRemainingDisplay = "\(Int(minutesRemaining)):\(secondsDisplay)"
        
        return timeRemainingDisplay
    }
    
    private func imageToDisplay(for timeRemaining: TimeInterval) -> NSImage? {
        let percentageComplete = 100 - (timeRemaining / prefs.selectedTime * 100)
        if eggTimer.isStopped {
            let stoppedImageName = (timeRemaining == 0) ? "100" : "stopped"
            return NSImage(named: stoppedImageName)
        }
        
        let imageName: String
        switch percentageComplete {
        case 0 ..< 25:
            imageName = "0"
        case 25 ..< 50:
            imageName = "25"
        case 50 ..< 75:
            imageName = "50"
        case 75 ..< 100:
            imageName = "75"
        default:
            imageName = "100"
        }
        
        return NSImage(named: imageName)
    }
    
    func configureButtonAndMenus() {
        let enableStart: Bool
        let enableStop: Bool
        let enableReset: Bool
        
        if eggTimer.isStopped {
            enableStart = true
            enableStop = false
            enableReset = false
        } else if eggTimer.isPaused {
            enableStart = true
            enableStop = false
            enableReset = true
        } else {
            enableStart = false
            enableStop = true
            enableReset = false
        }
        
        startButton.isEnabled = enableStart
        stopButton.isEnabled = enableStop
        resetButton.isEnabled = enableReset
        
        if let appDel = NSApplication.shared().delegate as? AppDelegate {
            appDel.enableMenus(start: enableStart, stop: enableStop, reset: enableReset)
        }
    }
}

extension ViewController {
    func setupPrefs() {
        updateDisplay(for: prefs.selectedTime)
        
        let notificationName = Notification.Name(rawValue: "PrefsChanged")
        NotificationCenter.default.addObserver(forName: notificationName, object: nil, queue: nil) {
            (notification) in self.checkForResetAfterPrefsChange()
        }
    }
    
    func updateFromPrefs() {
        self.eggTimer.duration = self.prefs.selectedTime
        self.resetButtonClicked(self)
    }
    
    func checkForResetAfterPrefsChange() {
        if eggTimer.isStopped || eggTimer.isPaused {
            updateFromPrefs()
        } else {
            let alert = NSAlert()
            
            alert.messageText = "Reset timer with the new settings?"
            alert.informativeText = "This will stop your current timer!"
            alert.alertStyle = .warning
            
            alert.addButton(withTitle: "Reset")
            alert.addButton(withTitle: "Cancel")
            
            let response = alert.runModal()
            if response == NSAlertFirstButtonReturn {
                self.updateFromPrefs()
            }
        }
    }
}

extension ViewController {
    func prepareSound() {
        guard let audioFileUrl = Bundle.main.url(forResource: "ding", withExtension: "mp3") else {
            return
        }
        
        do {
            soundPlayer = try AVAudioPlayer(contentsOf: audioFileUrl)
            soundPlayer?.prepareToPlay()
        } catch {
            print("Sounc Player not available: \(error)")
        }
    }
    
    func playSound() {
        soundPlayer?.play()
    }
}

