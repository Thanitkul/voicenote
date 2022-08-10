var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var lastDebounceTranscript;

// utility tools
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
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
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    recognition.lang = 'th-TH';
    recognition.start();
    ignore_onend = false;
    past_span.innerHTML += final_span.innerHTML;
    final_span.innerHTML = '';
    interim_span.innerHTML = '';
    showInfo('info_allow');
    start_timestamp = event.timeStamp;
}

// initialize recognition
function stt() {    
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
}

recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
};

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
    var interim_transcript = '';
        if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            upgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {

            var transcript = event.results[i][0].transcript;
            var confidence = event.results[i][0].confidence;
            var isFinal = event.results[i].isFinal && (confidence > 0);

            if (isFinal) {
            /*
            // check duplicate result on android
            if(transcript+confidence == lastDebounceTranscript) { return; }
            lastDebounceTranscript = transcript+confidence;
            console.log(lastDebounceTranscript);
            */
            final_transcript += transcript;
            } else {
            interim_transcript += transcript;
            }
        }
        console.log(final_transcript);
        $.ajax({
          type: "POST",
          url: "/",
          data: {
            'text': final_transcript
          }
        });
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
        // do something
        }
};

// handle transcribe button
$('#btn-transcribe').click((evt) => {
    console.log("hi") ;
    // let thiz = evt.target;
    // let ready_text = 'Transcribe';
    // let working_text = 'Working...';
    // let working = $(thiz).html() == working_text;

    // if(!working){ // press to start
    //     // ui
    //     $(thiz).html(working_text);
    //     $(thiz).removeClass('btn-primary');
    //     $(thiz).addClass('btn-danger');

    //     // start
    //     startButton(evt);
    // }
    // else { // press to stop
    //     // ui
    //     $(thiz).html(ready_text);
    //     $(thiz).addClass('btn-primary');
    //     $(thiz).removeClass('btn-danger');

    //     // stop
    //     recognizing = false;
    //     recognition.stop();
    // }
});