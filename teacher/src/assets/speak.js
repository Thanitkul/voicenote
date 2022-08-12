// initialize recognition
var recognition; 
var recognizing = false;
var final_transcript = '';
var ignore_onend;
var start_timestamp;
var lastDebounceTranscript;
var two_line = /\n\n/g;
var one_line = /\n/g;
var first_char = /\S/;


function stt() {
    console.log("1");
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        console.log("2");
        recognizing = true;
        showInfo('info_speak_now');
    };

    recognition.onerror = function(event) {
        console.log("3");
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
        console.log("4");
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            console.log("5");
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
        var interim_transcript = '';
        console.log("onresults");
        if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            console.log("onresults 2");
            var transcript = event.results[i][0].transcript;
            var confidence = event.results[i][0].confidence; 
            var isFinal = event.results[i].isFinal && (confidence > 0);
            console.log(transcript);
            console.log(confidence);
            console.log(isFinal);
        
            if (isFinal) {
                console.log("finalized");
                /*
                // check duplicate result on android
                if(transcript+confidence == lastDebounceTranscript) { return; }
                lastDebounceTranscript = transcript+confidence;
                console.log(lastDebounceTranscript);
                */
                final_transcript += transcript;
                console.log(final_transcript);
            } else {
                interim_transcript += transcript;
                console.log(interim_transcript);
            }
        }
        console.log(interim_transcript)
        console.log(final_transcript);
        $.ajax({
            type: "POST",
            url: "/speak",
            data: {
            'text': final_transcript
            }
        });
        final_transcript = capitalize(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        if (final_transcript || interim_transcript) {
            // do something
        }
    }
};

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
    console.log(final_transcript);
    recognition.lang = 'th-TH';
    if (recognizing) {
        recognition.stop(); 
        return;
    }
    final_transcript = '';
    recognition.lang = 'th-TH';
    recognition.start();
    ignore_onend = false;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    showInfo('info_allow');
    start_timestamp = event.timeStamp;
};

function changeButton() {
    let thiz = $('#btn-transcribe').target;
    let ready_text = 'Transcribe';
    let working_text = 'Working...';
    let working = $('#btn-transcribe').html() == working_text;

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
      $('#btn-transcribe').html(ready_text);
      $('#btn-transcribe').removeClass('btn-danger');
      $('#btn-transcribe').addClass('btn-primary');

      // stop
      recognizing = false;
      recognition.stop();
    }
  }