var selectGridElem=document.getElementById("selectGrid")

for (var i=5;i<=18;i++) {
    var optionElem = document.createElement("option")
    optionElem.innerText=i
    optionElem.setAttribute("id",i)
    selectGridElem.appendChild(optionElem)
}

var showAnswerElem = document.getElementById("showAnswer")
var showCheckBoxAnswer1 = document.getElementById("checkBoxAnswer1")
var showCheckBoxAnswer2 = document.getElementById("checkBoxAnswer2")
showAnswerElem.addEventListener("click",function(){
    showCheckBoxAnswer1.style.display="flex"
    showCheckBoxAnswer2.style.display="flex"
})

var checkBoxContainerElem=document.getElementById("checkBoxContainer")
selectGridElem.addEventListener("change",display_grid)
var divElem=document.createElement("div")
var optionVal = selectGridElem.value
var width1=optionVal*60
var height1=optionVal*60
divElem.style.width=width1+"px"
divElem.style.height=height1+"px"
console.log(width1)
console.log(height1)
divElem.style.borderStyle="solid"
divElem.style.borderColor="white";
divElem.setAttribute("id","checkBox")
divElem.style.display="flex"
divElem.style.flexDirection="row"
divElem.style.flexWrap="wrap"
checkBoxContainerElem.appendChild(divElem)

function displayCheckBoxCell(i,j) {
var checkBoxElem = document.getElementById("checkBox")
var checkcell=document.createElement("div")
checkcell.style.height="60px";
checkcell.style.width="60px";
checkcell.setAttribute("id",i+"_"+j)
checkcell.style.border="solid"
checkcell.style.borderWidth="0px"
checkcell.style.borderColor="white"
checkcell.classList.add("filled-value")
checkcell.addEventListener("click", () => fillBoard(i, j));
checkBoxElem.append(checkcell)
}
for (var i=0;i<optionVal;i++) {
    for(var j=0;j<optionVal;j++) {
        displayCheckBoxCell(i,j)
        var cell =document.getElementById(i+"_"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
    }
}
function display_grid() {
    clearBox()
    var successMessageElem1=document.getElementById("successMessage")
    successMessageElem1.style.display="none"
    var errorMsgElem1=document.getElementById("errorMsg")
        errorMsgElem1.style.display="none"
    var divElem=document.createElement("div")
    var optionVal = selectGridElem.value
    console.log(optionVal)
    var width1=optionVal*60
    var height1=optionVal*60
    divElem.style.width=width1+"px"
    divElem.style.height=height1+"px"
    divElem.style.borderStyle="solid"
    divElem.style.borderColor="white";
    divElem.style.borderWidth="0px"
    divElem.setAttribute("id","checkBox")
    divElem.style.display="flex"
    divElem.style.flexDirection="row"
    divElem.style.flexWrap="wrap"
    checkBoxContainerElem.appendChild(divElem)
    for (var i=0;i<optionVal;i++) {
        for(var j=0;j<optionVal;j++) {
            displayCheckBoxCell(i,j)
            var cell =document.getElementById(i+"_"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
        }
    }

}
function clearBox() {
    var checkBoxElem=document.getElementById("checkBox")
    checkBoxContainerElem.removeChild(checkBoxElem)
}

function fillBoard(i,j) {
    var clickedElem = document.getElementById(i+"_"+j)
    if (clickedElem.textContent === '' ) {
        clickedElem.innerText = "Q"
        var style=window.getComputedStyle(clickedElem)
        var bgcolor=style.backgroundColor
        if (bgcolor === "rgb(255, 255, 255)") {
            clickedElem.classList.add("cell-with-black")
        }
        else {
            clickedElem.classList.add("cell-with-white")
        }
    }
    else {
        if (i%2===0 && j%2===0) {
            clickedElem.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            clickedElem.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            clickedElem.style.backgroundColor="black"
        }
        else {
            clickedElem.style.backgroundColor="white"
        }
        clickedElem.innerText=''
        console.log("no")
    }
}


// get answer from board
var submitPuzzleElem = document.getElementById("submitPuzzle")
submitPuzzleElem.addEventListener("click",get_answer_from_board)
function get_answer_from_board() {
    var selectVal = document.getElementById("selectGrid").value
    result=[]
    for (var i=0;i<selectVal;i++) {
        temp=[]
        for (var j=0;j<selectVal;j++) {
            var elem=document.getElementById(i+"_"+j)
            if (elem.textContent === 'Q') {
                temp.push(1)
            }
            else {
                temp.push(0)
            }
        }
        result.push(temp)
    }
    console.log(result)
    if (checkIfAllRowsHaveOne(result,selectVal) === true) {
        var errorMsgElem=document.getElementById("errorMsg")
        errorMsgElem.style.display="none"
        if (checkValidPuzzle(result,selectVal) === true) {
            var successMessageElem=document.getElementById("successMessage")
            for (var i=0;i<selectVal;i++) {
                for(var j=0;j<selectVal;j++){
                    var clickedElem=document.getElementById(i+"_"+j)
                    if (i%2===0 && j%2===0) {
                        clickedElem.style.backgroundColor="white"
                    }
                    else if (i%2===0 && j%2 !==0) {
                        clickedElem.style.backgroundColor="black"
                    }
                    else if (i%2!==0 && j%2===0) {
                        clickedElem.style.backgroundColor="black"
                    }
                    else {
                        clickedElem.style.backgroundColor="white"
                    }
                }
            }
            successMessageElem.style.display="block"
            console.log("success")
        }
        else {
            var successMessageElem=document.getElementById("successMessage")
            successMessageElem.style.display="none"
            list1=[]
            for (var i=0;i<selectVal;i++) {
                for(var j=0;j<selectVal;j++) {
                    if (result[i][j] === 1) {
                        if (!(isValidCell(i, j, result, selectVal)))  {
                            list1.push([i,j])
                        }
                    }
                }
            }
            for (var i=0;i<selectVal;i++) {
                for(var j=0;j<selectVal;j++){
                    var clickedElem=document.getElementById(i+"_"+j)
                    if (i%2===0 && j%2===0) {
                        clickedElem.style.backgroundColor="white"
                    }
                    else if (i%2===0 && j%2 !==0) {
                        clickedElem.style.backgroundColor="black"
                    }
                    else if (i%2!==0 && j%2===0) {
                        clickedElem.style.backgroundColor="black"
                    }
                    else {
                        clickedElem.style.backgroundColor="white"
                    }
                }
            }
            var length1=list1.length
            for (var i=0;i<length1;i++) {
                var elem=document.getElementById(list1[i][0]+"_"+list1[i][1])
                elem.style.backgroundColor="red"
            }
        }
    }
    else {
        var errorMsgElem=document.getElementById("errorMsg")
        errorMsgElem.style.display="block"
    }

}

function isValidCell(i, j, nqueenArr, n) {
    let i1 = i-1, j1 = j;
    while (i1 >= 0) {
        if (nqueenArr[i1][j1] === 1) return false;
        i1--;
    }

    let i2 = i+1, j2 = j;
    while (i2 < n) {
        if (nqueenArr[i2][j2] === 1) return false;
        i2++;
    }

    let i3 = i, j3 = j-1;
    while (j3 >= 0) {
        if (nqueenArr[i3][j3] === 1) return false;
        j3--;
    }

    let i4 = i, j4 = j+1;
    while (j4 < n) {
        if (nqueenArr[i4][j4] === 1) return false;
        j4++;
    }

    let i5 = i-1, j5 = j-1;
    while (i5 >= 0 && j5 >= 0) {
        if (nqueenArr[i5][j5] === 1) return false;
        i5--;
        j5--;
    }

    let i6 = i+1, j6 = j-1;
    while (i6 < n && j6 >= 0) {
        if (nqueenArr[i6][j6] === 1) return false;
        i6++;
        j6--;
    }

    let i7 = i-1, j7 = j+1;
    while (i7 >= 0 && j7 < n) {
        if (nqueenArr[i7][j7] === 1) return false;
        i7--;
        j7++;
    }

    let i8 = i+1, j8 = j+1;
    while (i8 < n && j8 < n) { // Corrected condition from `i8 > n` and `j8 > n`
        if (nqueenArr[i8][j8] === 1) return false;
        i8++;
        j8++;
    }

    return true;
}

function checkValidPuzzle(nqueenArr,n) {
    for (var i=0;i<n;i++) {
        for(var j=0;j<n;j++) {
            if (nqueenArr[i][j]===1) {
                if(isValidCell(i, j, nqueenArr, n) === false){
                    return false
                }
            }
        }
    }
    return true
}

function checkIfAllRowsHaveOne(nqueenArr,n) {
    for (var i=0;i<n;i++) {
        if (nqueenArr[i].includes(1) === false) {
            console.log(i)
            return false
        }
    }
    return true
}




function isValidCellForAnswer1(i, j,n,nqueenArr) {
    let i1 = i, j1 = j;
    while (i1 >= 0) {
        if (nqueenArr[i1][j1] === 1) return false;
        i1 -= 1;
    }

    let i2 = i, j2 = j;
    while (i2 < n) {
        if (nqueenArr[i2][j2] === 1) return false;
        i2 += 1;
    }

    let i3 = i, j3 = j;
    while (j3 >= 0) {
        if (nqueenArr[i3][j3] === 1) return false;
        j3 -= 1;
    }

    let i4 = i, j4 = j;
    while (j4 < n) {
        if (nqueenArr[i4][j4] === 1) return false;
        j4 += 1;
    }

    let i5 = i, j5 = j;
    while (i5 >= 0 && j5 >= 0) {
        if (nqueenArr[i5][j5] === 1) return false;
        i5 -= 1;
        j5 -= 1;
    }

    let i6 = i, j6 = j;
    while (i6 < n && j6 >= 0) {
        if (nqueenArr[i6][j6] === 1) return false;
        i6 += 1;
        j6 -= 1;
    }

    let i7 = i, j7 = j;
    while (i7 >= 0 && j7 < n) {
        if (nqueenArr[i7][j7] === 1) return false;
        i7 -= 1;
        j7 += 1;
    }

    let i8 = i, j8 = j;
    while (i8 < n && j8 < n) {
        if (nqueenArr[i8][j8] === 1) return false;
        i8 += 1;
        j8 += 1;
    }

    return true;
}



function nqueen(i,nqueenArr,n) {
    if (i >= 0 && i < n) {
        for (let j = 0; j < n; j++) {
            if (isValidCellForAnswer1(i, j,n,nqueenArr)) {
                nqueenArr[i][j] = 1;
                if (nqueen(i + 1,nqueenArr,n)) {
                    return true;
                } else {
                    nqueenArr[i][j] = 0;
                }
            }
        }
        return false;
    }
    return true;
}











var checkBoxAnswer1Elem=document.getElementById("checkBoxAnswer1")
selectGridElem.addEventListener("change",display_grid_answer1)
var divElemAnswer1=document.createElement("div")
var optionValAnswer1 = selectGridElem.value
var width1Answer1=optionValAnswer1*60
var height1Answer1=optionValAnswer1*60
divElemAnswer1.style.width=width1Answer1+"px"
divElemAnswer1.style.height=height1Answer1+"px"
divElemAnswer1.style.borderStyle="solid"
divElemAnswer1.style.borderColor="white";
divElemAnswer1.setAttribute("id","AnswerCheckbox1")
divElemAnswer1.style.display="flex"
divElemAnswer1.style.flexDirection="row"
divElemAnswer1.style.flexWrap="wrap"
checkBoxAnswer1Elem.appendChild(divElemAnswer1)

function displayCheckBoxCellAnswer1(i,j) {
var checkBoxElemAnswer1 = document.getElementById("AnswerCheckbox1")
var checkcellAnswer1=document.createElement("div")
checkcellAnswer1.style.height="60px";
checkcellAnswer1.style.width="60px";
checkcellAnswer1.setAttribute("id",i+"*"+j)
checkcellAnswer1.style.border="solid"
checkcellAnswer1.style.borderWidth="0px"
checkcellAnswer1.style.borderColor="white"
checkcellAnswer1.classList.add("filled-value")
checkBoxElemAnswer1.append(checkcellAnswer1)
}
for (var i=0;i<optionVal;i++) {
    for(var j=0;j<optionVal;j++) {
        displayCheckBoxCellAnswer1(i,j)
        var cell =document.getElementById(i+"*"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
    }
}
var n2=document.getElementById("selectGrid").value
    var nqueenArr2=[]
    for (var i=0;i<n2;i++) {
        var temp=[]
        for(var j=0;j<n2;j++) {
            temp.push(0)
    }
    nqueenArr2.push(temp)
}
    nqueen(0,nqueenArr2,n2);
    console.log(nqueenArr2)
    for (var i=0;i<n2;i++) {
        for(var j=0;j<n2;j++) {
            if (nqueenArr2[i][j] === 1) {
                var elem=document.getElementById(i+"*"+j)
                var style=window.getComputedStyle(elem)
                var bgcolor=style.backgroundColor
                if (bgcolor === "rgb(255, 255, 255)") {
                    elem.classList.add("cell-with-black")
                }
                else {
                    elem.classList.add("cell-with-white")
                }
                elem.innerText="Q"
            }
        }
    }
function display_grid_answer1() {
    checkBoxAnswer1Elem.style.display="none"
    clearBoxAnswer1()
    var divElem=document.createElement("div")
    var optionVal = selectGridElem.value
    console.log(optionVal)
    var width1=optionVal*60
    var height1=optionVal*60
    divElem.style.width=width1+"px"
    divElem.style.height=height1+"px"
    divElem.style.borderStyle="solid"
    divElem.style.borderColor="white";
    divElem.style.borderWidth="0px"
    divElem.setAttribute("id","AnswerCheckbox1")
    divElem.style.display="flex"
    divElem.style.flexDirection="row"
    divElem.style.flexWrap="wrap"
    checkBoxAnswer1Elem.appendChild(divElem)
    for (var i=0;i<optionVal;i++) {
        for(var j=0;j<optionVal;j++) {
            displayCheckBoxCellAnswer1(i,j)
            var cell =document.getElementById(i+"*"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
        }
    }
    var n1=document.getElementById("selectGrid").value
    var nqueenArr=[]
    for (var i=0;i<n1;i++) {
        var temp=[]
        for(var j=0;j<n1;j++) {
            temp.push(0)
    }
    nqueenArr.push(temp)
}
    nqueen(0,nqueenArr,n1);
    for (var i=0;i<n1;i++) {
        for(var j=0;j<n1;j++) {
            if (nqueenArr[i][j] === 1) {
                var elem=document.getElementById(i+"*"+j)
                var style=window.getComputedStyle(elem)
                var bgcolor=style.backgroundColor
                if (bgcolor === "rgb(255, 255, 255)") {
                    elem.classList.add("cell-with-black")
                }
                else {
                    elem.classList.add("cell-with-white")
                }
                elem.innerText="Q"
            }
        }
    }
    console.log(nqueenArr)

}
function clearBoxAnswer1() {
    var checkBoxElem=document.getElementById("AnswerCheckbox1")
    checkBoxAnswer1Elem.removeChild(checkBoxElem)
}




var checkBoxAnswer2Elem=document.getElementById("checkBoxAnswer2")
selectGridElem.addEventListener("change",display_grid_answer2)
var divElemAnswer2=document.createElement("div")
var optionValAnswer2 = selectGridElem.value
var width1Answer2=optionValAnswer2*60
var height1Answer2=optionValAnswer2*60
divElemAnswer2.style.width=width1Answer2+"px"
divElemAnswer2.style.height=height1Answer2+"px"
divElemAnswer2.style.borderStyle="solid"
divElemAnswer2.style.borderColor="white";
divElemAnswer2.setAttribute("id","AnswerCheckbox2")
divElemAnswer2.style.display="flex"
divElemAnswer2.style.flexDirection="row"
divElemAnswer2.style.flexWrap="wrap"
checkBoxAnswer2Elem.appendChild(divElemAnswer2)

function displayCheckBoxCellAnswer2(i,j) {
var checkBoxElemAnswer2 = document.getElementById("AnswerCheckbox2")
var checkcellAnswer2=document.createElement("div")
checkcellAnswer2.style.height="60px";
checkcellAnswer2.style.width="60px";
checkcellAnswer2.setAttribute("id",i+"^"+j)
checkcellAnswer2.style.border="solid"
checkcellAnswer2.style.borderWidth="0px"
checkcellAnswer2.style.borderColor="white"
checkcellAnswer2.classList.add("filled-value")
checkBoxElemAnswer2.append(checkcellAnswer2)
}
for (var i=0;i<optionVal;i++) {
    for(var j=0;j<optionVal;j++) {
        displayCheckBoxCellAnswer2(i,j)
        var cell =document.getElementById(i+"^"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
    }
}
var n3=document.getElementById("selectGrid").value
    var nqueenArr3=[]
    for (var i=0;i<n3;i++) {
        var temp=[]
        for(var j=0;j<n3;j++) {
            temp.push(0)
    }
    nqueenArr3.push(temp)
}
    nqueen(0,nqueenArr3,n2);
    console.log(nqueenArr3)
    for (var i=0;i<n3;i++) {
        for(var j=0;j<n3;j++) {
            if (nqueenArr3[i][j] === 1 ) {
                nqueenArr3[i][j] = 0
                nqueenArr3[i][n3-j-1]=1
                break
            }
        }
    }
    for (var i=0;i<n3;i++) {
        for(var j=0;j<n3;j++) {
            if (nqueenArr3[i][j] === 1) {
                var elem=document.getElementById(i+"^"+j)
                var style=window.getComputedStyle(elem)
                var bgcolor=style.backgroundColor
                if (bgcolor === "rgb(255, 255, 255)") {
                    elem.classList.add("cell-with-black")
                }
                else {
                    elem.classList.add("cell-with-white")
                }
                elem.innerText="Q"
            }
        }
    }
function display_grid_answer2() {
    checkBoxAnswer2Elem.style.display="none"
    clearBoxAnswer2()
    var divElem=document.createElement("div")
    var optionVal = selectGridElem.value
    console.log(optionVal)
    var width1=optionVal*60
    var height1=optionVal*60
    divElem.style.width=width1+"px"
    divElem.style.height=height1+"px"
    divElem.style.borderStyle="solid"
    divElem.style.borderColor="white";
    divElem.style.borderWidth="0px"
    divElem.setAttribute("id","AnswerCheckbox2")
    divElem.style.display="flex"
    divElem.style.flexDirection="row"
    divElem.style.flexWrap="wrap"
    checkBoxAnswer2Elem.appendChild(divElem)
    for (var i=0;i<optionVal;i++) {
        for(var j=0;j<optionVal;j++) {
            displayCheckBoxCellAnswer2(i,j)
            var cell =document.getElementById(i+"^"+j)
        if (i%2===0 && j%2===0) {
            cell.style.backgroundColor="white"
        }
        else if (i%2===0 && j%2 !==0) {
            cell.style.backgroundColor="black"
        }
        else if (i%2!==0 && j%2===0) {
            cell.style.backgroundColor="black"
        }
        else {
            cell.style.backgroundColor="white"
        }
        }
    }
    var n2=document.getElementById("selectGrid").value
    var nqueenArr2=[]
    for (var i=0;i<n2;i++) {
        var temp=[]
        for(var j=0;j<n2;j++) {
            temp.push(0)
    }
    nqueenArr2.push(temp)
}

    nqueen(0,nqueenArr2,n2);
    for (var i=0;i<n2;i++) {
        for(var j=0;j<n2;j++) {
            if (nqueenArr2[i][j] === 1 ) {
                nqueenArr2[i][j] = 0
                nqueenArr2[i][n2-j-1]=1
                break
            }
        }
    }
    for (var i=0;i<n2;i++) {
        for(var j=0;j<n2;j++) {
            if (nqueenArr2[i][j] === 1) {
                var elem=document.getElementById(i+"^"+j)
                var style=window.getComputedStyle(elem)
                var bgcolor=style.backgroundColor
                if (bgcolor === "rgb(255, 255, 255)") {
                    elem.classList.add("cell-with-black")
                }
                else {
                    elem.classList.add("cell-with-white")
                }
                elem.innerText="Q"
            }
        }
    }

}
function clearBoxAnswer2() {
    var checkBoxElem=document.getElementById("AnswerCheckbox2")
    checkBoxAnswer2Elem.removeChild(checkBoxElem)
}


var tipsRulesForNqueenElem = document.getElementById("tipsRulesForNqueen")
var tipsRulesBtnElem = document.getElementById("tipsRulesBtn")
tipsRulesBtnElem.addEventListener("click",function(){
    tipsRulesForNqueenElem.style.display="flex"
})

var resetPuzzleElem=document.getElementById("resetPuzzle")
resetPuzzleElem.addEventListener("click",function(){
    resetPuzzleFunc()
    checkBoxAnswer2Elem.style.display="none"
    checkBoxAnswer1Elem.style.display="none"
})
function resetPuzzleFunc() {
    var val=selectGridElem.value
    for (var i=0;i<val;i++) {
        for (var j=0;j<val;j++) {
            var elem = document.getElementById(i+"_"+j)
            elem.innerText=""
        }
    }
}