//This list will be used to simulate the task of the new SPR experiment



PennController.ResetPrefix(null);

function Pick(set,n) {
    assert(set instanceof Object, "First argument of pick cannot be a plain string");
    n = Number(n);
    if (isNaN(n) || n<0) n = 0;
    this.args = [set];
    set.remainingSet = null;
    this.run = function(arrays){
        if (set.remainingSet===null) set.remainingSet = arrays[0];
        const newArray = [];
        for (let i = 0; i < n && set.remainingSet.length; i++)
            newArray.push( set.remainingSet.shift() );
        return newArray;
    }
        }
        function pick(set, n) { return new Pick(set,n); }




PennController.AddHost("https://koheihaneda.github.io/WSS_EN_images/")
    // PennController.DebugOff() // use for the final version
    PennController.Sequence( "welcome","demographics",
    "instructions",
    "practice", "end_practice",
    pick(list = seq("experiment_trial"),30),
    "break1", //20
    pick(list,30), "break2", //60
    pick(list,30),
    "end_exp", //120
    "post-ques", "send", "final");

CheckPreloaded("practice", "experiment_trial")
    
    //*********************************************************************************************************************************************************************************************
    // INTRO
    //********************************************************************************************************************************************************************************************
    
    PennController("welcome",
    
    fullscreen()
    ,
    defaultText
    .print()
    ,       
    newText("text2", "<p>University of Groningen</p>")
    .settings.center()
    .settings.css("font-style","italic")
    
    ,
    newText("text1", "<h2>Welcome and thank you for taking the time to participate in our experiment!</h2>")
    .settings.center()
    .settings.css("font-size", "large")
    
    ,
    newText("browser_info", "<br>For technical reasons, please make sure that you participate in the experiment <b>only through Mozilla Firefox or Google Chrome</b>.")
    .settings.css("font-size", "large")
    .settings.center()
    ,
    newText("bi", "Please <b>DO NOT</b> carry out the experiment on your tablet or cell phone, but only on your laptop or PC.")
    .settings.center()
    .settings.css("font-size", "large")
    ,
    newText("bi2", "Also, kindly make sure that your browser window is in full screen mode.")
    .settings.center()
    .settings.css("font-size", "large")
    ,
    newText("bi3", "Choose a comfortable and quiet place for the next 30 minutes! Thank you very much!")
    .settings.center()
    .settings.css("font-size", "large")
    ,        
    
    newText("br", "<br>")
    .print()
    ,        
    newButton("button1", "Start").settings.css("font-size", "20px")
    .settings.center()
    .print()
    .wait()
    ,
    getText("text1")
    .remove()
    
    ,
    getText("browser_info")
    .remove()
    ,
    getText("text2")
    .remove()
    ,
    getText("bi")
    .remove()
    ,
    getText("bi2")
    .remove()
    ,
    getText("bi3")
    .remove()
    ,
    getText("br")
    .remove()
    ,       
    getButton("button1")
    .remove()
    ,
    newHtml("consentInfo", "consentInfo.html")
    .settings.center()
    .print()
    .checkboxWarning("Please check the box to continue!")
    ,
    newButton("button2", "Continue").settings.css("font-size", "20px")
    .settings.center()
    .print()
    .wait(
    getHtml("consentInfo").test.complete()
    .failure(getHtml("consentInfo").warn())
    )      
    ,
    getHtml("consentInfo")
    .remove()
    ,
    getButton("button2")
    .remove()
    ,
    fullscreen()
    
    
    )
    
    .setOption("countsForProgressBar", false)   // no need to see the progress bar in the intro phase
    .setOption("hideProgressBar", true);


//// DEMOGRAPHICS ==============================================================
PennController("demographics",
               newText("demo", "<b>Personal Data</b> <p>We need some information about you...</p>")
               .settings.css("font-family", "times new roman")
               .settings.css("font-size", "18px"),
               
               newCanvas("democanvas", 1000, 120)
               .settings.add(20, 0, getText("demo"))
               .print(),
               
               newDropDown("age", "Please select an option.")
               .settings.add("18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "�ber 31")
               .settings.log(),
               
               newText("agetext", "1. Age:")
               .settings.css("font-size", "18px")
               .settings.bold(),
               
               newCanvas("agecanvas", 1000, 40)
               .settings.add(20, 0, getText("agetext"))
               .settings.add(450, 2, getDropDown("age"))
               .print(),
               
               newText("sex", "2. Sex:")
               .settings.css("font-size", "18px")
               .settings.bold(),
               
               newDropDown("sex", "Please select an option.")
               .settings.add("Female", "Male", "Other")
               .settings.log(),
               
               newCanvas("sexcanvas", 1000, 40)
               .settings.add(20, 0, getText("sex"))
               .settings.add(450, 3, getDropDown("sex"))
               .print(),
               
               newText("german", "3. Is English your mother tongue?")
               .settings.css("font-size", "18px")
               .settings.bold(),
               
               newDropDown("german", "Please select an option.")
               .settings.add("Yes", "No")
               .settings.log(),
               
               newCanvas("germancanvas", 1000, 40)
               .settings.add(20, 0, getText("german"))
               .settings.add(450, 3, getDropDown("german"))
               .print(),
               
               newText("bilingual", "<b>4. Were you raised bilingual (did you learn a language other than English before the age of 6)?</b><br><small>(If you selected Yes, please write down which other language(s) you were raised with)</small><br><br>")
               .settings.css("font-size", "18px"),
               
               newTextInput("bilingualinput", "")
               .settings.size(150, 40)
               .settings.hidden(),
               
               newText("bilingual_input", "")
               .settings.after(getTextInput("bilingualinput")),
               
               newDropDown("bilingual", "<br>" +"Please select an option.")
               .settings.add("Yes", "No")
               .settings.log()
               .settings.after(getText("bilingual_input"))
               .settings.callback(
                   getDropDown("bilingual")
                   .test.selected("Yes")
                   .success(getTextInput("bilingualinput").settings.visible(true))
                   .failure(getTextInput("bilingualinput").settings.visible(false))
               ),
               
               newCanvas("bilingual", 1000, 40)
               .settings.add(20, 0, getText("bilingual"))
               .settings.add(870, 3, getDropDown("bilingual"))
               .print(),
               
               newCanvas("filler", 1, 20)
               .print(),
               
               newButton("continue", "Continue")
               .settings.css("font-family", "calibri")
               .settings.css("font-size", "20px")
               .settings.log()
               .print()
               .wait(
                   newFunction('dummy', () => true).test.is(true)
                               .and(getDropDown("age").test.selected()
                                    .failure(newText('errorage', "Please provide your age.").color("red").print()))
                               .and(getDropDown("sex").test.selected()
                                    .failure(newText('errorsex', "Please provide your sex.").color("red").print()))
                               .and(getDropDown("german").test.selected()
                                    .failure(newText('errorgerman', "Please provide information about your native language.").color("red").print()))
                               .and(getDropDown("bilingual").test.selected()
                                    .failure(newText('errorbilingual', "Please indicate whether you were raised bilingual or monolingual.").color("red").print()))
                              ),
                   
                   getDropDown("age").wait("first"),
                   getDropDown("sex").wait("first"),
                   getButton("continue").remove(),
                   newText("<p>").print()
               )
               
               .setOption("countsForProgressBar", false)
               .setOption("hideProgressBar", true);
               
               PennController.ResetPrefix()
    
    
    
    
    
    //*******************************************************************************************************************************************************************
    // HOW TO BEHAVE & INSTRUCTIONS
    //******************************************************************************************************************************************
    PennController("instructions",
    fullscreen(),
    
    newText("intro", "<p>Thank you for your participation in this experiment!</p> <p>・The following experiment consists of 3 parts:<br> 1. a short practice round, 2. the actual experiment, and 3. a post-experiment questionnaire.<br></p> <p>・In total, it will take about 30 minutes to complete (including 2 breaks of 1 minute each).</p> ")
    .settings.css("font-size", "27px"),
    
    newText("Remember", "<p>・Please remember that you can only conduct this experiment on your <b>PC/laptop</b> using <b>Mozilla Firefox or Google Chrome</b>. <p>・Your window should be in full-screen mode.</p> <p>・Press the <b>space bar to continue...</b></p>")
    .settings.css("font-size", "27px"),
    
    newCanvas("introc", 900, 450)
    .settings.add(40, 0, getText("intro"))
    .settings.add(40, 300, getText("Remember"))
    .settings.center()
    .print(),
    
    newKey("intro", " ")
    .wait(),
    
    getCanvas("introc")
    .remove(),
    
    newText("precau", "<p>Since <b>this is a scientific experiment,</b> we would greatly appreciate it if you could take the following steps to ensure your concentration: <p><t>・Turn off any music/audio you might be listening to. <p><t>・Refrain from chatting or engaging in any activity other than the experiment during the session. <p><t>・Set your phone to silent and place it face down or out of reach.<p><t>・Focus on the experiment until it is over (there are short breaks).<p><t>・Behave as if you were in our laboratory! <p><t>・These steps will help ensure that the data we collect from you is of high quality. <p><t><t><b>Please press the space bar <u>if you agree to these steps.</u></b>")
    .settings.css("font-size", "27px"),
    
    newCanvas("preccanvas", 900, 450)
    .settings.add(20, 0, getText("precau"))
    .settings.center()
    .print(),
    
    newKey("set-up", " ")
    .wait(),
    
    getCanvas("preccanvas")
    .remove(),
    
    newText("intro1", 
    "<p><b><u>Guidance (!!PLEASE READ THIS VERY CAREFULLY!!):</u></b></p>" +
    "<p>1. First, you will see an incomplete sentence fragment on the screen, like:<br>" +
    "<i>'Last Friday, Joanna was…'</i><br> Read it at your normal speed. After a few seconds, the sentence fragment will disappear, so try to remember it.</p>" +
    "<p>2. Next, you will either see:<br>" +
    "・An image (e.g., a woman riding a skateboard), <b>OR</b><br>" +
    "・Another text fragment (e.g., 'skateboarding at the park').<br>" +
    "Think about the connection between the earlier sentence fragment and the image or text you see now. After a few seconds, this image or text will disappear, so try to remember it.</p>" +
    "<p>3. Then, a row of underbars (<code>_</code>) will appear at the center of the screen.</p>" +
    "<p>4. Hit the Space Bar once to replace the first <code>_</code> with a text chunk.<br>" +
    "Hitting the Space Bar again will replace the current text with the next chunk.<br>" +
    "<b>・Important:</b> You cannot go back to previous text chunks, only forward.</p>" +
    "<p>5. Continue pressing the Space Bar to read the full sentence at your normal reading speed. <b><u>Do not hold down the Space Bar.</b></u></p>" +
    "<p>6. After finishing the sentence, you may be asked a question about the sentence(s) or image you just read or saw (You have 5 seconds to respond):<br>" +
    "・Press <b>‘F’</b> for <b>Yes</b>.<br>" +
    "・Press <b>‘J’</b> for <b>No</b>.</p>" +
    "<p>7. Repeat this process until the task is complete.</p>" +
    "<p><b><u>If you believe that you have understood the task fully, please press the Space Bar. Further instructions will follow.</p></b></u>")
    
    .settings.css("font-size", "23px"),
    
    newCanvas("intro_canvas", 1000, 600)
    .settings.add(20, 0, getText("intro1"))
    .settings.center()
    .print(),
    
    newKey("next_intro", " ")
    .wait(),
    
    getCanvas("intro_canvas")
    .remove(),
    
    newText("fingerPlacement", "<p><b>Finger placement on the keyboard</b><br>").settings.css("font-size", "27px"),
    
    newText("fingerPlacement2", 
    "<p>To read the sentences, you must use your thumb. Use your <b>right thumb if you are right-handed</b>, or <b>your left thumb if you are left-handed</b>.</p>" +
    "<p>To answer questions about the combinations of sentences and photos:</p>" +
    "<p>While your thumb rests on the Space Bar, place your <b>left index finger on the F key ('Yes' key)</b> and <b>the left index finger on the J key ('No' key)</b>. Please maintain this finger placement throughout the entire experiment.</p>"
    ).settings.css("font-size", "27px"),
    
    newText("exit_intro", "<b>If you believe that you have fully understood the instructions, please press the Space Bar to begin the practice trials.</b>")
    .settings.css("font-size", "30px").settings.center(),
    
    newCanvas("intro_canvas", 1000, 700)
    .settings.add(20, 0, getText("fingerPlacement"))
    .settings.add(20, 150, getText("fingerPlacement2"))
    .settings.add(20, 610, getText("exit_intro"))
    .settings.center()
    .print(),
    
    newKey("begin", " ") // key before starting the practice trials
    .wait(),
    
    getCanvas("intro_canvas")
    .remove(),
    
    newTimer("30_before_exp", 3000)
    .start()
    .wait()
    )
    
    //*******************************************************************************************************************************************************************
    // PRACTICE ITEMS
    //******************************************************************************************************************************************
    PennController.Template(
    PennController.GetTable("master_spr1_long1.csv").filter("type", "practice"),
    variable => [
    "practice",
    "PennController", PennController(
    fullscreen()
    ,
    // Dots at the beginning
    newText("start1_1", "...<span style='visibility: hidden;'>" +
    [...new Array(variable.framing.length - 3)].map(() => "_").join("") + "</span>")
    .css({ "font-size": "25px", "font-family": "courier" })
    .print("center at 50%", "middle at 50%")
    ,
    newTimer("start1_1_timer", 600).start().wait()
    ,
    getText("start1_1").remove()
    ,
    // Context text displayed for 3 seconds
    newText("context", variable.framing)
    .css({ "font-family": "courier", "font-size": "25px" })
    .print("center at 50%", "middle at 50%")
    ,
    newTimer("context_timer", 3000).start().wait()
    ,
    getText("context").remove()
    ,
    // Adding the picture or linguistic stimulus
    newText("start", "<b>+</b>")
    .css({ "font-size": "55px" })
    .center()
    .print("center at 50%", "middle at 50%")
    ,
    newTimer("start", 1000).start().wait()
    ,
    getText("start").remove()
    ,
    defaultImage.size(450, 450)
    ,
    defaultText.css({ "font-family": "courier" })
    ,
    variable.modality === "visual"
    ? newImage("picture1", variable.picture).print("center at 50%", "middle at 50%")
    : newText("linguistic_text", variable.linguistic)
    .css({ "font-family": "courier", "font-size": "25px" })
    .print("center at 50%", "middle at 50%")
    ,
    newTimer("lookatpic_prac", 3000).start().wait()
    ,
    variable.modality === "visual"
    ? getImage("picture1").remove()
    : getText("linguistic_text").remove()
    ,
    newTimer("start", 600).start().wait()
    ,
    // Critical sentence and dots
    
    newText("start1_2", "...<span style='visibility: hidden;'>" +
    [...new Array(variable.critical.length - 3)].map(() => "_").join("") + "</span>")
    .css({ "font-size": "25px", "font-family": "courier" })
    .print("center at 50%", "middle at 50%")
    ,
    newTimer("start1_2_timer", 600).start().wait()
    ,
    getText("start1_2").remove()
    ,
    // Critical sentence in cumulative presentation
    newController("DashedSentence", {
    s: variable.critical
    .replace(/_/g, "\u00A0")   // Replace underscores (_) with a non-breaking space (Unicode: \u00A0)
    .split(" ")                // Split the sentence into chunks by spaces
    })
    .css("font size", "25px")
    .print("center at 50%", "middle at 50%")
    .log()
    .wait()
    .remove()              
    ,
    
    // Post-sentence comprehension task
    variable.type === "practice"
    ? [
    newText("rating_instru", variable.question + "<br>")
    .css({ "font-size": "25px", "font-family": "courier" })
    .print("center at 50%", "middle at 50%").log()
    ,
    newText("rating_instru2", "<p><b>'F' means = 'Yes'</b><b>'J' means = 'No'</b>")
    .css({ "font-size": "25px", "color": "black", "font-family": "courier" })
    .print("center at 50%", "middle at 52%")
    ,
    newText("F_text", "F")
    .css({ "font-size": "20px" })
    .print("center at 30%", "middle at 60%")
    ,
    newText("yes_text", "<i>(Yes)</i>")
    .css({ "font-size": "20px", "color": "green" })
    .print("center at 30%", "middle at 64%")
    ,
    newText("J_text", "J")
    .css({ "font-size": "20px" })
    .print("center at 65%", "middle at 60%")
    ,
    newText("no_text", "<i>(No)</i>")
    .css({ "font-size": "20px", "color": "red" })
    .print("center at 65%", "middle at 64%")
    ,
    newKey("rating", "FJ")
    .callback(getTimer("time_out1").stop())
    .log("all")
    ,
    newTimer("time_out1", 5000).start().log().wait()
    ,
    getText("rating_instru").remove()
    ,
    getText("rating_instru2").remove()
    ,
    getText("F_text").remove()
    ,
    getText("J_text").remove()
    ,
    getText("no_text").remove()
    ,
    getText("yes_text").remove()
    ,
    getKey("rating").disable()
    ,
    newVar("rating").set(getKey("rating"))
    ,
    getKey("rating").test.pressed().failure(
    newText("time-out", "A bit too slow! Try to be quicker!")
    .css({ "font-size": "30px", "color": "red", "font-family": "courier" })
    .center()
    .print("40vh")
    )
    ]
    : [],
    newText("continue", "<i>Press space bar to continue</i>")
    .css({ "font-size": "30px", "font-family": "courier" })
    .print("center at 50%", "middle at 50%")
    ,
    newKey("Continue", " ").wait().log()
    )
    .log("item", variable.item)
    .log("itemid", variable.itemid)
    .log("type", variable.type)
    .log("condition", variable.condition)
    .log("grammar", variable.grammar)
    .log("modality", variable.modality)
    .log("verb_type", variable.verb_type)
    .log("framing", variable.framing)
    .log("picture", variable.picture)
    .log("linguistic", variable.linguistic)
    .log("critical", variable.critical)
    .log("question", variable.question)
    .log("correct_answer", variable.correct_answer)
    ]
    );




//*******************************************************************************************************************************************************************
// END of PRACTICE
//******************************************************************************************************************************************
PennController( "end_practice" ,
                
                newText("end_practice", "<p>This is the end of the exercise!</p><p>The actual experiment starts as soon as you press the space bar!</p><p>Are you ready?</p>")
                .settings.css("font-size", "30px")
                .settings.css("font-family","courier")
                .print("center at 50%", "middle at 50%")
                ,
                
                newKey("end_pract", " ")
                .wait()
                .log()
                ,  
                
                getText("end_practice")
                .remove()
                
               )   
    
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);



//*******************************************************************************************************************************************************************
// EXPERIMENTAL TRIALS : CRITICALS + FILLERS (already pseudo-randomized) //
//******************************************************************************************************************************************



PennController.Template( PennController.GetTable("master_spr1_long1.csv")
                         .filter("type" , (/^(critical|filler)$/))
                         ,  
                         variable => ["experiment_trial",
                                      "PennController", PennController(
                                          fullscreen()
                                          ,
                                          
                                          // Dots at the beginning
                                          newText("start1_1", "...<span style='visibility: hidden;'>" +
                                                  [...new Array(variable.framing.length - 3)].map(() => "_").join("") + "</span>")
                                                  .css({ "font-size": "25px", "font-family": "courier" })
                                                  .print("center at 50%", "middle at 50%")
                                                  ,
                                                  newTimer("start1_1_timer", 600).start().wait()
                                                  ,
                                                  getText("start1_1").remove()
                                                  ,
                                                  // Context text displayed for 3 seconds
                                                  newText("context", variable.framing)
                                                  .css({ "font-family": "courier", "font-size": "25px" })
                                                  .print("center at 50%", "middle at 50%")
                                                  ,
                                                  newTimer("context_timer", 3000).start().wait()
                                                  ,
                                                  getText("context").remove()
                                                  ,
                                                  // Adding the picture or linguistic stimulus
                                                  newText("start", "<b>+</b>")
                                                  .css({ "font-size": "55px" })
                                                  .center()
                                                  .print("center at 50%", "middle at 50%")
                                                  ,
                                                  newTimer("start", 1000).start().wait()
                                                  ,
                                                  getText("start").remove()
                                                  ,
                                                  defaultImage.size(450, 450)
                                                  ,
                                                  defaultText.css({ "font-family": "courier" })
                                                  ,
                                                  variable.modality === "visual"
                                                  ? newImage("picture1", variable.picture).print("center at 50%", "middle at 50%")
                                                  : newText("linguistic_text", variable.linguistic)
                                          .css({ "font-family": "courier", "font-size": "25px" })
                                          .print("center at 50%", "middle at 50%")
                                          ,
                                          newTimer("lookatpic_prac", 3000).start().wait()
                                          ,
                                          variable.modality === "visual"
                                          ? getImage("picture1").remove()
                                          : getText("linguistic_text").remove()
                                      ,
                                      newTimer("start", 600).start().wait()
                                      ,
                                      // Critical sentence and dots
                                      
                                      newText("start1_2", "...<span style='visibility: hidden;'>" +
                                              [...new Array(variable.critical.length - 3)].map(() => "_").join("") + "</span>")
                                              .css({ "font-size": "25px", "font-family": "courier" })
                                              .print("center at 50%", "middle at 50%")
                                              ,
                                              newTimer("start1_2_timer", 600).start().wait()
                                              ,
                                              getText("start1_2").remove()
                                              ,
                                              // Critical sentence in cumulative presentation
                                              newController("DashedSentence", {
                                                  s: variable.critical
                                                  .replace(/_/g, "\u00A0")   // Replace underscores (_) with a non-breaking space (Unicode: \u00A0)
                                                  .split(" ")                // Split the sentence into chunks by spaces
                                              })
                                              .css("font size", "25px")
                                              .print("center at 50%", "middle at 50%")
                                              .log()
                                              .wait()
                                              .remove()
                                              ,
                                              
                                              
                                              // Post-sentence comprehension task
                                              variable.type === "filler"
                                              ? [
                                                  newText("rating_instru", variable.question + "<br>")
                                                  .css({ "font-size": "25px", "font-family": "courier" })
                                                  .print("center at 50%", "middle at 50%").log()
                                                  ,
                                                  newText("rating_instru2", "<p><b>'F' means = 'Yes'</b><b>'J' means = 'No'</b>")
                                                  .css({ "font-size": "25px", "color": "black", "font-family": "courier" })
                                                  .print("center at 50%", "middle at 52%")
                                                  ,
                                                  newText("F_text", "F")
                                                  .css({ "font-size": "20px" })
                                                  .print("center at 30%", "middle at 60%")
                                                  ,
                                                  newText("yes_text", "<i>(Yes)</i>")
                                                  .css({ "font-size": "20px", "color": "green" })
                                                  .print("center at 30%", "middle at 64%")
                                                  ,
                                                  newText("J_text", "J")
                                                  .css({ "font-size": "20px" })
                                                  .print("center at 65%", "middle at 60%")
                                                  ,
                                                  newText("no_text", "<i>(No)</i>")
                                                  .css({ "font-size": "20px", "color": "red" })
                                                  .print("center at 65%", "middle at 64%")
                                                  ,
                                                  newKey("rating", "FJ")
                                                  .callback(getTimer("time_out1").stop())
                                                  .log("all")
                                                  ,
                                                  newTimer("time_out1", 5000).start().log().wait()
                                                  ,
                                                  getText("rating_instru").remove()
                                                  ,
                                                  getText("rating_instru2").remove()
                                                  ,
                                                  getText("F_text").remove()
                                                  ,
                                                  getText("J_text").remove()
                                                  ,
                                                  getText("no_text").remove()
                                                  ,
                                                  getText("yes_text").remove()
                                                  ,
                                                  getKey("rating").disable()
                                                  ,
                                                  newVar("rating").set(getKey("rating"))
                                                  ,
                                                  getKey("rating").test.pressed().failure(
                                                      newText("time-out", "A bit too slow! Try to be quicker!")
                                                      .css({ "font-size": "20px", "color": "red", "font-family": "courier" })
                                                      .center()
                                                      .print("40vh")
                                                  )
                                              ]
                                              : [],
                                              newText("continue", "<i>Press space bar to continue</i>")
                                      .css({ "font-size": "25px", "font-family": "courier" })
                                      .print("center at 50%", "middle at 50%")
                                      ,
                                      newKey("Continue", " ").wait().log()
                                      )
                                      .log("item", variable.item)
                                      .log("itemid", variable.itemid)
                                      .log("type", variable.type)
                                      .log("condition", variable.condition)
                                      .log("grammar", variable.grammar)
                                      .log("modality", variable.modality)
                                      .log("verb_type", variable.verb_type)
                                      .log("framing", variable.framing)
                                      .log("picture", variable.picture)
                                      .log("linguistic", variable.linguistic)
                                      .log("critical", variable.critical)
                                      .log("question", variable.question)
                                      .log("correct_answer", variable.correct_answer)
                                      
                                     ]
                        );







//*******************************************************************************************************************************************************************
// TAKE A BREAK - 1/3
//******************************************************************************************************************************************
PennController( "break1" ,
                
                newText("break_text", "<p><b>Time for the first break!</b><br><p>This will last about 1 minute, but if you want to skip it or end it earlier, press the Space Bar.</p>"+
                        "<p>We recommend using this time to relax a little. Thank you for your attention and patience!</p>")
                .settings.css("font-size", "30px")
                .settings.center()
                
                
                
                ,
                newCanvas("break1_canvas", 1000, 600)
                .settings.add(20,0, getText("break_text"))
                .settings.center()        
                .print()
                
                ,
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getCanvas("break1_canvas")
                .remove(getText("break_text"))
                ,
                getCanvas("break1_canvas").remove()
                
                
                ,
                
                getKey("continue_exp")
                .remove()   
                ,
                
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


//*******************************************************************************************************************************************************************
// TAKE A BREAK - 2/3
//******************************************************************************************************************************************
PennController( "break2" ,
                
                newText("break_text", "<p><b>Time for the second break!</b><br><p>This will last about 1 minute, but if you want to skip it or end it earlier, press the Space Bar.</p>"+
                        "<p>We recommend using this time to relax a little. Thank you for your attention and patience!</p>")
                .settings.css("font-size", "30px")
                .settings.center()
                
                
                
                ,
                newCanvas("break1_canvas", 1000, 600)
                .settings.add(20,0, getText("break_text"))
                .settings.center()        
                .print()
                
                ,
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getCanvas("break1_canvas")
                .remove(getText("break_text"))
                ,
                getCanvas("break1_canvas").remove()
                
                
                ,
                
                getKey("continue_exp")
                .remove()   
                ,
                
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);


//*******************************************************************************************************************************************************************
// TAKE A BREAK - 3/3
//******************************************************************************************************************************************
PennController( "break3" ,
                
                newText("break_text", "<p><b>Zeit f&uuml;r die dritte und letzte Pause!</b><br><p>Sie dauert etwa 1 Minute, aber wenn Du sie &uuml;berspringen oder fr&uuml;her beenden m&ouml;chtest, <b>dr&uuml;cke auf die Leertaste</b>."+
                        " Es wird empfohlen, diese Zeit zu nutzen, um Dich ein wenig zu entspannen. Wir bedanken uns bei Dir f&uuml;r Deine Aufmerksamkeit und Geduld!")
                .settings.css("font-size", "20px")
                .settings.center()
                ,
                newText("break_intro", "<p>Wenn Du dein Ge&auml;chtnis in Bezug auf die Platzierung der Finger auf der Tastatur auffrischen m&ouml;chtest, sieh Dir die folgenden Bilder an:")
                .settings.css("font-size", "20px")
                .settings.center()
                
                ,
                newImage("lefty1", "https://amor.cms.hu-berlin.de/~plescama/pictures_WP1/finger_left.png").css("border", "solid 1px black")
                .settings.size(400, 300)
                ,
                newImage("righty1", "https://amor.cms.hu-berlin.de/~plescama/pictures_WP1/finger_right.png").css("border", "solid 1px black")
                .settings.size(400, 300)
                
                
                ,
                newCanvas("break1_canvas", 1000, 600)
                .settings.add(20,0, getText("break_text"))
                .settings.add(20,150, getText("break_intro"))
                .settings.add(20,220, getImage("lefty1"))
                .settings.add(550,220, getImage("righty1"))
                .settings.center()        
                .print()
                
                ,
                newTimer("break_timer", 60000)
                .start()                
                ,
                newKey("continue_exp", " ")                 
                .callback( getTimer("break_timer").stop() )   
                ,
                getTimer("break_timer")
                .wait("first")
                ,
                getText("break_text")
                .remove()                
                ,
                getCanvas("break1_canvas")
                .remove(getText("break_text"))
                .remove(getText("break_intro"))
                .remove( getImage("lefty1"))
                .remove(getImage("righty1"))
                ,
                getCanvas("break1_canvas").remove()
                
                
                ,
                
                getKey("continue_exp")
                .remove()   
                ,
                
                newTimer(5000)
                .start()
                .wait()             
               )   
    
    .log("type", "break")
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);

//*******************************************************************************************************************************************************************
// End of Experiment
//******************************************************************************************************************************************
PennController( "end_exp" ,
                newText("end_exp","<p> This is the end of the experiment phase! Next, there will be a short post-experiment questionnaire. </p>")
                .settings.css("font-family","times new roman") .settings.css("font-size", "30px")
                .settings.center()
                .print("center at 50%", "middle at 50%")
                
                ,
                
                newKey("end_exp", " ")
                .wait()
                .log()
                ,  
                
                getText("end_exp")
                .remove()
                
               )   
    
    
    
    
    .setOption("countsForProgressBar", false)   //overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true);
//*******************************************************************************************************************************************************************
// POST EXPERIMENT QUESTIONNAIRE
//******************************************************************************************************************************************

PennController("post-ques",
               newText("post-instruc", "We would like to ask you to answer a few questions about the experiment. Your answers should be brief but informative..<p><p>")
               .settings.center()
               .settings.bold()
               .print()
               ,
               // Q1
               newText("notice", "1. Did you notice anything specific during the experiment (e.g., patterns, regularities, or anything unusual or surprising)?")
               .settings.center()
               .print()
               
               ,
               newTextInput("notice")
               .size(600,50)
               .settings.center()
               .print()
               .log()
               ,
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,
               newButton("next1", "Next question")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next1")
               .remove()
               ,
               // Q2
               newText("about", "2. Do you think you have figured out the purpose of this experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("about")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .settings.center()
               .print()
               ,            
               newButton("next2", "Next question")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next2")
               .remove()
               ,
               //Q3
               newText("hard", "Did you encounter any challenges during the experiment?")
               .settings.center()
               .print()
               ,
               newTextInput("hard","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,     
               newText("blank", "<p>")
               .print()
               ,            
               newButton("next3", "Next question")
               .settings.center()
               .print()
               .wait()
               ,
               getButton("next3")
               .remove()
               ,
               // Q4
               newText("strategy", "4. Did you come up with any particular strategies while participating in the experiment? If so, please describe them.")
               .settings.center()
               .print()
               ,
               newTextInput("strategy","")
               .size(600, 50)
               .settings.center()
               .print()
               .log()
               ,   
               newText("blank", "<p>")
               .print()
               ,              
               newButton("next4", "Finish!")
               .settings.center()
               .print()
               .wait()
               ,
               // create Vars
               newVar("notice") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("notice") )
               ,
               newVar("about") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("about") )
               ,
               newVar("hard") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("hard") )
               ,
               newVar("strategy") // this will create a new variable "ID"; MUST be after the 'Start' button click
               .settings.global()
               .set(getTextInput("strategy") )
              )
    
    //*******************************************************************************************************************************************************************
    // SEND THE RESULTS TO THE SERVER
    //******************************************************************************************************************************************
    
    PennController.SendResults( "send" ); // send results to the server before participants see the actual end of the experiment


//*******************************************************************************************************************************************************************
// THKS & BYE
//******************************************************************************************************************************************                      
PennController.Template(
    PennController.GetTable("validation.csv"), // Change this line for the appropriate experimental list
    variable => PennController("final",
        exitFullscreen(),
        newText("<p>This is the end of the experiment. Thank you very much for your participation!</p>")
            .settings.css("font-family", "times new roman")
            .settings.css("font-size", "18px")
            .settings.center()
            .print(),
        newText("<p>Please copy the following code and enter it into the Prolific form to confirm your participation and receive payment:</p>")
            .settings.css("font-family", "times new roman")
            .settings.css("font-size", "18px")
            .settings.center()
            .print(),
        newText("<p>Important: Treat this code as confidential and do not share it with anyone else!</p>")
            .settings.css("font-family", "times new roman")
            .settings.css("font-size", "18px")
            .settings.center()
            .print(),
        newText("<p><b>" + "XXXXXXXXXX" + "</b></p>")
            .settings.css("font-family", "times new roman")
            .settings.css("font-size", "30px")
            .settings.center()
            .settings.log("all")
            .print(),
        newHtml("linkContainer", `
            <div style="text-align: center; margin-top: 20px;">
                <button id="purposeButton" 
                        style="font-size: 18px; background-color: #4CAF50; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;">
                    Would you like to know the purpose of this experiment?
                </button>
            </div>
        `)
        .print(),
        newFunction(() => {
            document.getElementById("purposeButton").onclick = () => {
                window.open("https://drive.google.com/file/d/1AOjC4-kaMlut_D2ovORTgkWDWtTY4Jwo/view?usp=drive_link", "_blank");
            };
        }).call(),
        newButton("void")
            .wait()
    )
    .setOption("countsForProgressBar", false) // Overrides some default settings, such as countsForProgressBar
    .setOption("hideProgressBar", true)
);







