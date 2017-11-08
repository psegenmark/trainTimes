  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAnAP9acxLNrRmU966m0hiDJtHO0rdCf3w",
    authDomain: "project-p-6edcd.firebaseapp.com",
    databaseURL: "https://project-p-6edcd.firebaseio.com",
    projectId: "project-p-6edcd",
    storageBucket: "project-p-6edcd.appspot.com",
    messagingSenderId: "430948400767"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Variables (SET the first set IN FIREBASE FIRST)
  // Note remember to create these same variables in Firebase!
  var trainName = "";
  var trainDestination = "";
  var trainTime1 = 0;
  var trainTime2 = 0;
  
  // Click Button changes what is stored in firebase
  $("#addTrain").on("click", function() {
    // Prevent the page from refreshing
    event.preventDefault();

    // Change what is saved in firebase
    database.ref().push({
      trainName: $("#addTrainName").val(),
      trainDestination: $("#addTrainDestination").val(),
      trainTime2: $("#addTrainFrequency").val(),
      trainTime1: $("#addTrainFirstTrainTime").val(),
      
    });
  });

  // Firebase is always watching for changes to the data.
  // When changes occurs it will print them to console and html
  database.ref().on('child_added', function(snapshot) {

    var td1 = $("<td>");
    td1.attr("id", "tdtrainName");
    
    var td2 = $("<td>");
    td2.attr("id", "tdtrainDestination");
    
    var td3 = $("<td>");
    td3.attr("id", "tdtrainTime2");
    
    var td4 = $("<td>");
    td4.attr("id", "tdtrainTime1");
    
    var td5 = $("<td>");
    td5.attr("id", "tdtrainMinLeft");
  
    // Change the HTML

    console.log(snapshot.val().trainName);
    console.log(snapshot.val().trainDestination);
    console.log(snapshot.val().trainTime2);
    console.log(snapshot.val().trainTime1);
  
    var trs = $("<tr>");
    
    
    var timeNow = moment().format('HH:mm:ss');

    console.log(timeNow);

   
    // Time for first train, minus current time. Take the result and divide by frequency. Round that number up to have next departure. That time minus current time is time left.
    
  
  // var tFrequency = (snapshot.val().trainTime2);
  // console.log(tFrequency);
  // var tTime = (snapshot.val().trainTime1);
  // console.log(tTime);

  // var firstTimeConverted = moment(tTime, "hh:mm").subtract(1, "years");
  // console.log(firstTimeConverted);

  // var currentTime = moment();
  
  // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log(diffTime);

  // var tRemainder = diffTime % tFrequency;
  // console.log(tRemainder);

  // var tMinutesTillTrain = tFrequency - tRemainder;
  // console.log(tMinutesTillTrain);

  // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  // console.log("Arrival Time:" +moment(nextTrain).format("hh:mm"));
  
  var a = timeNow.split(':'); // split it at the colons
  var secondsNow = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);  
  console.log(secondsNow);
  
  
    // when is first train leaving?
  var b = snapshot.val().trainTime1.split(':')

  var secondsTrain = ((+b[0]) * 60 * 60 + (+b[1]) * 60);  
  console.log(secondsTrain);  

  var nextTrain = (secondsNow-secondsTrain) 

  console.log(nextTrain);

  // / ((snapshot.val().trainTime2) * 60)

  var minToNextTrain = (nextTrain/((snapshot.val().trainTime2)*60));

  var nextTrainT = Math.ceil(minToNextTrain);

  var mNextTrain = (nextTrainT * ((snapshot.val().trainTime2)))

  var trainF = (mNextTrain * 60) + (secondsTrain);

  var minLeftTrain = ((trainF - secondsNow)/ 60);

  var nextTrainTrue = Math.ceil(Math.abs(minLeftTrain));

  var nextTrainHHMM = moment().startOf('day')
                              .seconds(trainF)
                              .format('HH:mm');
  console.log(nextTrainHHMM);


  td1.append(snapshot.val().trainName);
    td2.append(snapshot.val().trainDestination);
    td3.append(snapshot.val().trainTime2);
    td4.append(nextTrainHHMM);
    td5.append(nextTrainTrue);
    trs.append(td1, td2, td3, td4, td5);

    
    $(".table").append(trs);
  

  }, function(errorObject) {
  });

