const checkbox=document.getElementById('checkbox');
const button=document.getElementsByTagName('button')[0];
const namebox=document.getElementById('name');
const rollbox=document.getElementById('applicationnumber');
const namerrorbox=document.getElementById('namerror');
const applicationerrorbox=document.getElementById('applicationoerror');
var userName;var userRoll;var nameResult;var rollResult;
localStorage.removeItem('modifiedCount');
namebox.addEventListener('input', async ()=>{
    userName=namebox.value;
    if(userName!=''){
        nameResult = await fetch('https://national-test-abhyash.onrender.com/name',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:userName})
        }).then(res=>res.json()).catch(error=>console.error(error));
        if(nameResult.error.length!=0){
            const arr=[];
            nameResult.error.forEach((ele)=>{
                arr.push(ele.msg);
            });
            const message=arr.join(" ");
            if(message!=''){
                namebox.classList.remove('correct');namerrorbox.textContent=message;namerrorbox.classList.add('show');namebox.classList.add('error');button.disabled=true;button.style.cursor="not-allowed";button.style.backgroundColor="rgb(68,110,68)";button.style.color="rgb(31,31,31)";button.style.borderColor="rgba(132,131,131,0.688)";          
            }else{
                namerrorbox.textContent='';namerrorbox.classList.remove('show');namebox.classList.remove('error');
            }
        }else{
            namerrorbox.textContent='';namerrorbox.classList.remove('show');namebox.classList.remove('error');
            if(checkbox.checked==true && userRoll!='' && rollResult.error.length==0){
                button.disabled=false;button.style.cursor="pointer";button.style.color="black";button.style.backgroundColor="green";button.style.borderColor="rgba(255,248,248,0.688)";
            }
        }
    }else{
        namebox.classList.remove('correct');namerrorbox.textContent='';namerrorbox.classList.remove('show');namebox.classList.remove('error');button.disabled=true;button.style.cursor="not-allowed";button.style.backgroundColor="rgb(68,110,68)";button.style.color="rgb(31,31,31)";button.style.borderColor="rgba(132,131,131,0.688)";
    }
});
rollbox.addEventListener('input', async ()=>{
    userRoll=rollbox.value;
    if(userRoll!=''){
        rollResult= await fetch('https://national-test-abhyash.onrender.com/roll',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({roll:userRoll})
        }).then(res=>res.json()).catch(error=>console.error(error));
        if(rollResult.error.length!=0){
            const arr=[];
            rollResult.error.forEach((ele)=>{
                arr.push(ele.msg);
            });
            const message=arr.join(" ");
            if(message!=''){
                rollbox.classList.remove('correct');applicationerrorbox.textContent=message;applicationerrorbox.classList.add('show');rollbox.classList.add('error');button.disabled=true;button.style.cursor="not-allowed";button.style.backgroundColor="rgb(68,110,68)";button.style.color="rgb(31,31,31)";button.style.borderColor="rgba(132,131,131,0.688)";
            }else{
                applicationerrorbox.textContent='';applicationerrorbox.classList.remove('show');rollbox.classList.remove('error');
            }
        }else{
            applicationerrorbox.textContent='';applicationerrorbox.classList.remove('show');rollbox.classList.remove('error');
            if(checkbox.checked==true && userName!='' && nameResult.error.length==0){
                button.disabled=false;button.style.cursor="pointer";button.style.color="black";button.style.backgroundColor="green";button.style.borderColor="rgba(255,248,248,0.688)";
            }
        }
    }else{
        rollbox.classList.remove('correct');applicationerrorbox.textContent='';applicationerrorbox.classList.remove('show');rollbox.classList.remove('error');button.disabled=true;button.style.cursor="not-allowed";button.style.backgroundColor="rgb(68,110,68)";button.style.color="rgb(31,31,31)";button.style.borderColor="rgba(132,131,131,0.688)";
    }
});  
checkbox.addEventListener('change',()=>{
    if(nameResult.error.length===0 && rollResult.error.length===0 && userRoll!='' && userName!=''){
        if(checkbox.checked==false){
            button.disabled=true;
            button.style.cursor="not-allowed";
            button.style.backgroundColor="rgb(68,110,68)";
            button.style.color="rgb(31,31,31)";
            button.style.borderColor="rgba(132,131,131,0.688)";
        }else{
            button.disabled=false;
            button.style.cursor="pointer";
            button.style.backgroundColor="green";
            button.style.color="black";
            button.style.borderColor="rgba(255,248,248,0.688)";
        }
    }else if(nameResult.error.length!=0 || rollResult.error.length!=0 || userRoll=='' || userName==''){
        button.disabled=true;
        button.style.cursor="not-allowed";
        button.style.backgroundColor="rgb(68,110,68)";
        button.style.color="rgb(31,31,31)";
        button.style.borderColor="rgba(132,131,131,0.688)";
    }
});
namebox.addEventListener('blur',()=>{
    if(userName!=''){ 
        if(nameResult.error.length==0){
            namebox.classList.add('correct');
            if(checkbox.checked==true && rollResult.error.length==0 && userRoll!=''){
                button.disabled=false;button.style.cursor="pointer";button.style.backgroundColor="green";button.style.color="black";button.style.borderColor="rgba(255,248,248,0.688)";
            }
        }else{
            namebox.classList.remove('correct');
        }
    }else{
        namebox.classList.remove('correct');
    }
});
rollbox.addEventListener('blur',()=>{
    if(userRoll!=''){
        if(rollResult.error.length==0){
            rollbox.classList.add('correct');
            if(checkbox.checked==true && nameResult.error.length==0 && userName!=''){
                button.disabled=false;button.style.color="black";button.style.backgroundColor="green";button.style.cursor="pointer";button.style.borderColor="rgba(255,248,248,0.688)";
            }
        }else{
            rollbox.classList.remove('correct');
        }
    }else{
        rollbox.classList.remove('correct');
    }
});
document.getElementsByTagName('fieldset')[0].addEventListener('mouseenter',()=>{
    document.getElementsByTagName('fieldset')[0].style.scale='1.01';document.getElementsByTagName('fieldset')[0].style.boxShadow='5.5px 6.0px  11px 1.7px black';document.getElementsByTagName('fieldset')[0].style.translateZ='1.01';
});
document.getElementsByTagName('fieldset')[0].addEventListener('mouseleave',()=>{
    document.getElementsByTagName('fieldset')[0].style.scale='1.0';document.getElementsByTagName('fieldset')[0].style.boxShadow='none';document.getElementsByTagName('fieldset')[0].style.translateZ='1.0';
});
document.getElementsByTagName('fieldset')[0].addEventListener('touchstart',()=>{
    document.getElementsByTagName('fieldset')[0].style.scale='1.01';document.getElementsByTagName('fieldset')[0].style.boxShadow='5.5px 6.0px  11px 1.7px black';document.getElementsByTagName('fieldset')[0].style.translateZ='1.01';
});
document.getElementsByTagName('fieldset')[0].addEventListener('touchend',()=>{
    document.getElementsByTagName('fieldset')[0].style.scale='1.0';document.getElementsByTagName('fieldset')[0].style.boxShadow='none';document.getElementsByTagName('fieldset')[0].style.translateZ='1.0';
});
document.getElementById('rules').addEventListener('mouseenter',()=>{
    document.getElementById('rules').style.scale='1.01';document.getElementById('rules').style.boxShadow='5.5px 6.0px  11px 1.7px black';document.getElementById('rules').style.translateZ='1.01';
});
document.getElementById('rules').addEventListener('mouseleave',()=>{
    document.getElementById('rules').style.scale='1.0';document.getElementById('rules').style.boxShadow='none';document.getElementById('rules').style.translateZ='1.0';
});
document.getElementById('rules').addEventListener('touchstart',()=>{
    document.getElementById('rules').style.scale='1.01';document.getElementById('rules').style.boxShadow='5.5px 6.0px  11px 1.7px black';document.getElementById('rules').style.translateZ='1.01';
});
document.getElementById('rules').addEventListener('touchend',()=>{
    document.getElementById('rules').style.scale='1.0';document.getElementById('rules').style.boxShadow='none';document.getElementById('rules').style.translateZ='1.0';
});
button.addEventListener('click', async (e)=>{
    e.preventDefault();
    button.style.transition='background-color 30ms linear';button.style.backgroundColor='#78f484';
    setTimeout(()=>{
        button.style.backgroundColor='green';document.getElementById('loader').style.width='100vw';document.getElementById('loader').style.height='100vh';document.getElementById('loader').style.display='flex';document.getElementById('loader').style.flexDirection='row';document.getElementById('loader').style.gap='15px';document.getElementById('loader').style.justifyContent='center';document.getElementById('loader').style.alignItems='center';document.getElementById('loader').style.backgroundColor='rgb(13,13,13)';document.getElementById('loader').style.zIndex='999';document.getElementById('main').style.display='none';
    },100);
    setTimeout( async ()=>{
        try{
            var response= await fetch('https://national-test-abhyash.onrender.com/proxy_url',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:userName,roll:userRoll})
            });
            var result= await response.json();
            if("message" in result){
                window.location.href='/test';
            }else if("error" in result){
                alert("A server-side error occurred . Wait a while and try again!");
            }
        }catch(error){
            alert("An unknown error occurred . Please try again.");
            console.error(error);
        }
    },120);
});
button.addEventListener('touchstart', async (e)=>{
    e.preventDefault();
    button.style.transition='background-color 30ms linear';button.style.backgroundColor='#78f484';
    setTimeout(()=>{
        button.style.backgroundColor='green';document.getElementById('loader').style.width='100vw';document.getElementById('loader').style.height='100vh';document.getElementById('loader').style.display='flex';document.getElementById('loader').style.flexDirection='row';document.getElementById('loader').style.gap='15px';document.getElementById('loader').style.justifyContent='center';document.getElementById('loader').style.alignItems='center';document.getElementById('loader').style.backgroundColor='rgb(13,13,13)';document.getElementById('loader').style.zIndex='999';document.getElementById('main').style.display='none';
    },100);
    setTimeout( async ()=>{
        try{
            var response= await fetch('https://national-test-abhyash.onrender.com/proxy_url',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:userName,roll:userRoll})
            });
            var result= await response.json();
            if("message" in result){
                window.location.href='/test';
            }else if("error" in result){
                alert("A server-side error occurred . Wait a while and try again!");
            }
        }catch(error){
            alert("An unknown error occurred . Please try again.");
            console.error(error);
        }
    },120);
});
