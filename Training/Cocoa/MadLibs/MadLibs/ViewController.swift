//
//  ViewController.swift
//  MadLibs
//
//  Created by Arnaud LEMAIRE on 12/07/2017.
//  Copyright © 2017 Quantis. All rights reserved.
//

import Cocoa

class ViewController: NSViewController {

    @IBOutlet weak var pastTenseVerbTextField: NSTextField!
    @IBOutlet weak var singularNounCombo: NSComboBox!
    @IBOutlet weak var pluralNounPopup: NSPopUpButton!
    @IBOutlet var phraseTextView: NSTextView!
    @IBOutlet weak var amountLabel: NSTextField!
    @IBOutlet weak var amountSlider: NSSlider!
    @IBOutlet weak var datePicker: NSDatePicker!
    @IBAction func sliderChanged(_ sender: Any) {
        let amount = amountSlider.integerValue
        amountLabel.stringValue = "Amount: [\(amount)]"
    }
    @IBAction func goButtonClicked(_ sender: Any) {
        
        let pastTenseVerb = pastTenseVerbTextField.stringValue
        let singularNoun = singularNounCombo.stringValue
        let pluralNoun = pluralNouns[pluralNounPopup.indexOfSelectedItem]
        let phrase = phraseTextView.string ?? ""

        let madLibSentence = "Un \(singularNoun) \(pastTenseVerb) \(pluralNoun) et dit, \(phrase)!"
        
        readSentence(madLibSentence, rate: .normal)
    }
    fileprivate let singularNouns = ["chien", "ours en peluche", "ninja", "pirate", "dev"]
    fileprivate let pluralNouns = ["kebab", "arc-en-ciel", "iPhones", "pièces d'or"]
    override func viewDidLoad() {
        super.viewDidLoad()
        pastTenseVerbTextField.stringValue = "mange"
        singularNounCombo.removeAllItems()
        singularNounCombo.addItems(withObjectValues: singularNouns)
        singularNounCombo.selectItem(at: singularNouns.count-1)
        pluralNounPopup.removeAllItems()
        pluralNounPopup.addItems(withTitles: pluralNouns)
        pluralNounPopup.selectItem(at: 0)
        phraseTextView.string = "je code des apps macOs !!"
        sliderChanged(self)
        datePicker.dateValue = Date()
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    fileprivate func readSentence(_ sentence: String, rate: VoiceRate) {
        synth.rate = rate.speed
        synth.stopSpeaking()
        synth.startSpeaking(sentence)
    }
    
    fileprivate enum VoiceRate: Int {
        case slow
        case normal
        case fast
        
        var speed: Float {
            switch self {
            case .slow:
                return 60
            case .normal:
                return 175
            case .fast:
                return 360
            }
        }
    }
    
    fileprivate let synth = NSSpeechSynthesizer()


}

