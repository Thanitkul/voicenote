// initialize recognition

var recognition; 
var recognizing = false;
var final_transcript = '';
var transcript = '';
var ignore_onend;
var start_timestamp;
var lastDebounceTranscript;
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/; 
var transcript = '';


function stt() { 
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onerror = function(event) { 
        if (event.error == 'no-speech') {
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function() {
        recognizing = false;
        //currently false
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            showInfo('info_start');
            return;
        }
        showInfo('');
        /* select all text
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }
        */
    };

    recognition.onresult = function(event) {
        console.log(transcript);
        var interim_transcript = '';
        if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            transcript = event.results[i][0].transcript;
            //confidence not used to finalized
            // var confidence = event.results[i][0].confidence; 
            // var isFinal = event.results[i].isFinal && (confidence > 0);
            if (event.results[i].isFinal) {
                /*
                // check duplicate result on android
                if(transcript+confidence == lastDebounceTranscript) { return; }
                lastDebounceTranscript = transcript+confidence;
                console.log(lastDebounceTranscript);
                */
                console.log(transcript);
                if (final_transcript == '') {

                    final_transcript += transcript;
                }
                else {
                    final_transcript += ' ' + transcript;
                }
            return transcript;
            } else {
            interim_transcript += '' + transcript;
            }
        }
        console.log(interim_transcript)
        console.log(final_transcript);
        console.log(transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        if (final_transcript || interim_transcript) {
            // do something
        }
        return final_transcript;
    } 
}

function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function showInfo(msg){
    $('#info').html(msg);
}

function upgrade(){
    alert('Browser is not support');
}


function startButton() {
    recognition.lang = 'th-TH';
    if (recognizing) {
        recognition.stop(); 
        return;
    }
    $('#btn-reset').click(function() {
        recognizing = false;
        final_transcript = '';
        interim_transcript = '';
        final_span.innerHTML = '';
        interim_span.innerHTML = '';  
        recognition.stop(); 
    });
    recognition.lang = 'th-TH';
    recognition.start();
    ignore_onend = false;
    showInfo('info_allow');
    start_timestamp = event.timeStamp;
}

function changeButton() { 
    let ready_text = 'Start';
    let working_text = 'Pause';
    let working = $('#btn-transcribe').html() == working_text;
    
    $('#btn-reset').click(function() {
        $('#btn-transcribe').html("Start");
        $('#btn-transcribe').removeClass('btn-danger');
        $('#btn-transcribe').addClass('btn-primary');

        showInfo('info_reset');
    });

    if(!working){ // press to start
      // ui
      $('#btn-transcribe').html(working_text);
      $('#btn-transcribe').removeClass('btn-primary');
      $('#btn-transcribe').addClass('btn-danger');

      // start
      startButton();
    }
    else { // press to stop
      // ui
        console.log(transcript);
        $('#btn-reset').click(function() {
            $('#btn-transcribe').html(ready_text);
            $('#btn-transcribe').removeClass('btn-danger');
            $('#btn-transcribe').addClass('btn-primary');
        });
        $('#btn-transcribe').html(ready_text);
        $('#btn-transcribe').removeClass('btn-danger');
        $('#btn-transcribe').addClass('btn-primary');
      
      // stop
      recognizing = false;
      recognition.stop();
    }
} 