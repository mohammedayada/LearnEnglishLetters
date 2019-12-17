var names=[];
var b;
var coun=0;
//photos links
var photos =["0.jpg" ,"1.jpg" , "2.jpg" , "3.jpg" , "4.jpg" , "5.jpg" , "6.jpg" , "7.jpg" , "8.jpg" , "9.jpg" , "10.jpg" , "11.jpg" , "12.jpg" ,"13.jpg" ,"14.jpg" , "15.jpg" , "16.jpg" , "17.jpg" , "18.jpg" , "19.jpg" , "20.jpg" ,"21.jpg" ,"22.jpg" , "23.jpg" , "24.jpg" ,"25.jpg"];
//random between 1 to 26
function rand()
{
    return Math.floor(Math.random() * 26) + 1;
}
//new objec to add actions
const action = {
    "getEventType": "",
    "getEventTarget": "",
    "getEventTime": "",
    "getEventValue": ""
  };
//create objec to add actions
var obj = Object.create(action);

//add object to local storage onload
window.onload = function (e) {
    obj = Object.create(action);
    obj['getEventType'] = e.type;
    obj['getEventTarget'] = e.target;
    obj['getEventTime'] = e.timeStamp;
    obj['getEventValue'] = 'loading';
    names.push(obj);
    localStorage.setItem('session', JSON.stringify(names));       
  };

  //send to ajax.php
function aj(){
    for(i =0 ; i<names.length ; i++)
        $.ajax({
            type: "POST",
            url: "ajax.php",
            data: {"data": JSON.stringify(names[i])},
            success: function(){     
                window.localStorage.clear();    
                names=[];
            }
        });
}
setInterval(aj,5000);

  //add object to local storage onunload
  window.onunload = function (e) {
    obj = Object.create(action);
    obj['getEventType'] = e.type;
    obj['getEventTarget'] = e.target;
    obj['getEventTime'] = e.timeStamp;
    obj['getEventValue'] = 'unloading';
    names.push(obj);
    localStorage.setItem('session', JSON.stringify(names));
  };
  
function validation()
{
    //add object to local storage on generate buttons
    obj = Object.create(action);
    obj['getEventType'] = event.type;
    obj['getEventTarget'] = event.target;
    obj['getEventTime'] = event.timeStamp;
    obj['getEventValue'] = 'click generation';
    names.push(obj);
    localStorage.setItem('session', JSON.stringify(names));
    // count the number of presses on generation button
    coun++;
    //to remove all element in new generation
    if(coun>1)
    {
        var myNode=document.getElementById('alpha');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
          }
        
        var cl=document.getElementById("image");
        cl.hidden=true;
    }
    
    var inputVal = document.getElementById("text1").value;
    localStorage.inputVal=inputVal;
    b=inputVal=parseInt(inputVal , 10);
    
    if(inputVal>26|| inputVal<1 || !inputVal )
    {
        alert("you shoud enter number from 1 to 26");
    }
    else
    {
        //add random
        var Check = [];
        var num = 26;     
        for(var i=0;i<num;i++)
        {
            Check.push(false);
        }
        while(b!=0)
        {
            var x=rand();
            if(Check[x-1]==false)
            {
                Check[x-1]=true;
                add(x);
                b--;
            }      
        }
        //add photo in the page
        var linebreak = document.createElement("br");
        document.body.appendChild(linebreak);
        var btn = document.createElement("img");
        btn.hidden=true;
        btn.id="image";
        btn.width=300;
        btn.height=300;
        document.getElementById("im").appendChild(btn); 
    }
}

//add alphbet buttons
function add(alph)
{
    var btn = document.createElement("input");
    btn.type="button";   
    btn.value = String.fromCharCode('A'.charCodeAt(0) + alph-1);
    var x="show("+alph+");";
    btn.setAttribute("onclick",x); 
    btn.id=String.fromCharCode('A'.charCodeAt(0) + alph-1);
    document.getElementById("alpha").appendChild(btn);               
}
//show photos
function show(ind)
{
    ////add object to local storage on press in any button
    obj = Object.create(action);
    obj['getEventType'] = event.type;
    obj['getEventTarget'] = event.target;
    obj['getEventTime'] = event.timeStamp;
    obj['getEventValue'] =  "click on "+String.fromCharCode('A'.charCodeAt(0) + ind-1);
    names.push(obj);
    localStorage.setItem('session', JSON.stringify(names));
    
    //display the photo
    var node = document.getElementById("image");
    node.src="images/"+photos[ind-1];
    
    node.hidden=false;
}
// to Display the data base
var Db = document.querySelector('#db');
Db.addEventListener('click', function(e) {
    $.ajax({
      "type": "GET",
      "url": "ajax.php",
      "data": {"data": ""},
      "success": function(response){
        if(response){
          var data = JSON.parse(response);
          console.log(data);
        }
      }
    });
  });