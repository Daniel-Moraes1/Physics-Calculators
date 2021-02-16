function radToDeg(rad){
  return rad * 180 / Math.PI;
}

function degToRad(deg){
  return deg * Math.PI / 180;
}

function CalculateUnits() {
  var inputValue = parseFloat(document.getElementById("unitsInputValue").value);
  var inputMagnitude = parseInt(document.getElementById("unitsInputMagnitude").value);
  var inputUnits = document.getElementById("unitsInputUnits").value;
  var inputDimension =parseInt( document.getElementById("unitsInputDimension").value);
  var outputMagnitude = parseInt(document.getElementById("unitsOutputMagnitude").value);
  var solution = parseFloat(inputValue * (10 ** ((inputMagnitude - outputMagnitude)*inputDimension))).toPrecision(12);
  var s = ''
  if (outputMagnitude == 12)
    s = 'Terra';
  else if (outputMagnitude == 9)
    s = 'Giga';
  else if (outputMagnitude == 6)
    s = 'Mega';
  else if (outputMagnitude == 3)
    s = 'Kilo';
  else if (outputMagnitude == 2)
    s = 'Hecto';
  else if (outputMagnitude == 1)
    s = 'Deca';
  else if (outputMagnitude == -1)
    s = 'Deci'
  else if (outputMagnitude == -2)
    s = 'Centi';
  else if (outputMagnitude == -3)
    s = 'Milli';
  else if (outputMagnitude == -6)
    s = 'Micro';
  else if (outputMagnitude == -9)
    s = 'Nano';
  else if (outputMagnitude == -12)
    s = 'Pico';

  s = parseFloat(solution).toString() + ' ' + s + inputUnits + inputDimension.toString().sup();

  document.getElementById("unitsAnswer").innerHTML = s;


}

function CalculateVector() {
  var v1x = parseFloat(document.getElementById('vectorV1x').value);
  var v1y = parseFloat(document.getElementById('vectorV1y').value);
  var operator = document.getElementById('vectorOperator').value;
  var v2x = parseFloat(document.getElementById('vectorV2x').value);
  var v2y = parseFloat(document.getElementById('vectorV2y').value);
  var thetaOutput = '';

  if (operator == '+')
  {
    var vx = parseFloat(v1x + v2x);
    var vy = parseFloat(v1y + v2y);
    var output = '(' + vx.toString() + ', ' + vy.toString() + ')';
  }
  else if (operator == '-')
  {
    var vx = parseFloat(v1x - v2x);
    var vy = parseFloat(v1y - v2y);
    var output = '(' + vx.toString() + ', ' + vy.toString() + ')';
  }
  else if (operator == 'x')
  {
    var vx = parseFloat(v1x * v2x);
    var vy = parseFloat(v1y * v2y);
    var magX = Math.sqrt(v1x**2 + v1y**2);
    var magY = Math.sqrt(v2x **2 + v2y **2);

    var thetaR = Math.acos((vx + vy)/(magX * magY));
    var thetaD = radToDeg(thetaR);
    var output = 'Dot Product = ' + ((magX * magY)*Math.cos(thetaR)).toPrecision(5).toString();
    thetaOutput = '&#952;' + ' = '+ thetaD.toPrecision(5).toString() + '&deg;';
  }



  document.getElementById('vectorOutput').innerHTML = output;
  document.getElementById('thetaOutput').innerHTML = thetaOutput;


}


function solveFor1DSi(sf, vi, vf, a, t){
  if(vi != null && vf != null && t!=null)
  {
    a = (vf-vi)/t;
  }

  if (a == null){
    if (t == null){
      return("Not enough information");
    }

    else{
      if (vi == null){
        vi = vf;
      }
      if (vi == null){
        return("Not enough information");
      }
      else{
        si = (sf - (vi*t)).toPrecision(5).toString() + 'm';
        return si;
      }
    }
  }

  else if (sf != null && vi != null && vf != null){

    si = sf - ((vf**2 - vi**2)/(2*a)).toPrecision(5).toString() + 'm';
    return si;
  }
  else if (sf != null && vi != null && t!= null){
    si = (sf - vi*t - .5*a*(t**2)).toPrecision(5).toString() + 'm';
    return si;
  }
  else{
    return("Not enough information");
  }
}

function solveFor1DSf(si, vi, vf, a, t){
  console.log(si,vi,vf,a,t);
  if(vi != null && vf != null && t!=null)
  {
    a = (vf-vi)/t;
  }

  if (a == null){
    if (t == null){
      return("Not enough information");
    }

    else{
      if (vi == null){
        vi = vf;
      }
      if (vi == null){
        return("Not enough information");
      }
      else{
        sf = (si + (vi*t)).toPrecision(5).toString() + 'm';
        return sf;
      }
    }
  }

  else if (si != null && vi != null && vf != null){
    sf = (si + (vf**2 - vi**2)/(2*a)).toPrecision(5).toString() + 'm';
    return sf;
  }
  else if (si != null && vi != null && t!= null){
    sf = (si + (vi*t) + (.5*a*(t**2))).toPrecision(5).toString() + 'm';
    return sf;
  }
  else{
    return("Not enough information");
  }
}

function solveFor1DVi(si, sf, vf, a, t){
  if (a==null){
    if (si != null && sf != null && t!= null){
      vi = (sf-si)/t.toPrecision(5).toString() + 'ms&#8315;&#185;';
      return vi;
    }
    else {
      return("Not enough information");
    }
  }
  else if (t == null){
    if (vf != null && sf != null && si != null){
      vi = Math.sqrt(Math.abs((vf**2)-(2*a*(sf-si)))).toPrecision(5);
      return ('&#177' + vi.toString()+'ms&#8315;&#185;');
    }
    else{
      return("Not enough information");
    }
  }
  else if (sf == null || si == null){
    if (vf != null){
      vi = (vf - a*t).toPrecision(5).toString() + 'ms&#8315;&#185;';
      return vi;
    }
    else{
      return("Not enough information");
    }
  }
  else{
    vi = ((sf-si-(.5*a*(t**2)))/t).toPrecision(5).toString() + 'ms&#8315;&#185;';
    return vi;
  }
}

function solveFor1DVf(si, sf, vi, a, t){
  if (a == null){
    if (vi != null){
      vf = vi.toPrecision(5).toString() + 'ms&#8315;&#185;';
      return vf;
    }
    else if (sf != null && si != null && t != null)
    {
      vf = (sf-si)/t.toPrecision(5).toString() + 'ms&#8315;&#185;';
    }
    else{
      return("Not enough information");
    }
  }
  else if (t==null){
    if (si != null && sf != null & vi != null)
    {
      vf = '&#177;' + (Math.sqrt((vi**2+2*a*(sf-si)))).toPrecision(5) + 'ms&#8315;&#185;';
      return vf;
    }
    else{
      return("Not enough information");
    }
  }
  else{
    if (vi != null){
      vf = (vi + a*t).toPrecision(5).toString() + 'ms&#8315;&#185;';
      return vf;
    }
  }
}

function solveFor1DA(si, sf, vi, vf, t){
  if (t==null){
    if (vi != null && vf != null && si != null && sf != null){
      a = ((vf**2 - vi**2)/(2*(sf-si))).toPrecision(5).toString() + 'ms&#8315;&#178;';
      return a;
    }
    else {
      return("Not enough information");
    }
  }
  else if (vf == null){
    if (sf != null && si != null && vi != null){
      a = (2*(sf - si - vi*t)/(t**2)).toPrecision(5).toString() + 'ms&#8315;&#178;';
      return a;
    }
    else {
      return("Not enough information");
    }
  }
  else{
    if (vi != null){
      a = (vf - vi)/t.toPrecision(5).toString() + 'ms&#8315;&#178;';
      return a;
    }
    else{
      return("Not enough information");
    }
  }
}

function solveFor1DT(si, sf, vi, vf, a){
  if (a==null){
    if (si != null && sf != null && vi != null){
      t = (sf-si)/vi.toPrecision(5).toString();
      return t;
    }
    else{
      return("Not enough information");
    }
  }
  else if (vf == null){
    if (vi != null && si != null && sf != null){
      if (vi**2 - 4*a*(si-sf) > 0){
        t1 = (((-1*vi)-Math.sqrt(vi**2 - (4*a*.5*(si-sf))))/a).toPrecision(5);
        t2 = (((-1*vi)+Math.sqrt(vi**2 - (4*a*.5*(si-sf))))/a).toPrecision(5);
        if (t1>=0 && t2>=0)
          t = t1.toString() + 's or ' + t2.toString() + 's';
        else if (t1 < 0 && t2 >=0){
          t = t2.toString() + 's';
        }
        else{
          t = "No real values";
        }
        return t;
      }
      else if (vi**2 - 4*a*(si-sf) == 0){
        t = (((-1*vi)-Math.sqrt(vi**2 - (4*a*.5*(si-sf))))/a).toPrecision(5);
        if (t < 0){
          t = "No real values";
        }
        else{
          t = t.toString() + 's';
        }
        return t;
      }
      else{
        return "No real values";
      }
    }
  }
  else{
    if (vi != null){
      t = (vf-vi)/a.toPrecision(5).toString() + 's';
    }
    else{
      t = 'Not enough information';
    }
    return(t);
  }
}

function Calculate1DKinematics() {

  var si = (document.getElementById('si').value);
  if (si!='')
    si = parseFloat(si);
  else {
    si = null;
  }
  var sf = (document.getElementById('sf').value);
  if (sf!='')
    sf = parseFloat(sf);
  else {
    sf = null;
  }
  var vi = (document.getElementById('vi').value);
  if (vi!='')
    vi = parseFloat(vi);
  else {
    vi = null;
  }
  var vf = (document.getElementById('vf').value);
  if (vf!='')
    vf = parseFloat(vf);
  else {
    vf = null;
  }
  var a = (document.getElementById('a').value);
  if (a!='')
    a = parseFloat(a);
  else {
    a = null;
  }
  var t = (document.getElementById('t').value);
  if (t!='')
    t = parseFloat(t);
  else {
    t = null;
  }
  var solveFor = document.getElementById('solveFor').value;

  if (solveFor == 'si'){
    if (si == null)
      output = solveFor1DSi(sf, vi, vf, a, t);
    else {
      output = si;
    }
  }
  else if(solveFor == 'sf'){
    if (sf == null)
      output = solveFor1DSf(si, vi ,vf, a, t);
    else {
      output = sf;
    }
  }
  else if(solveFor == 'vi'){
    if (vi == null)
      output = solveFor1DVi(si, sf, vf, a, t);
    else {
      output = vi;
    }
  }
  else if (solveFor == 'vf'){
    if (vf == null)
      output = solveFor1DVf(si, sf, vi, a, t);
    else {
      output = vf;
    }
  }
  else if (solveFor == 'a'){
    if (a == null)
      output = solveFor1DA(si, sf, vi, vf, t);
    else {
      output = a;
    }
  }
  else if (solveFor == 't'){
    if (t==null)
      output = solveFor1DT(si, sf, vi, vf, a);
    else {
      output = t;
    }
  }
  document.getElementById('output1DKinematics').innerHTML = output;
}

function CalculateProjectileMotion(){}

function CalculateMomentum(){
  var m = document.getElementById('m').value;
  var v = document.getElementById('v').value;
  var p = document.getElementById('p').value;



  if ((m == '' && v == '') || (m=='' && p=='') || (v=='' && p=='')){
    document.getElementById('error').innerHTML = ('Error, must input 2 values');
  }
  else if (m==''){
    v = parseFloat(v);
    p = parseFloat(p);
    m = (p/v).toPrecision(5).toString();
    document.getElementById('m').value = m;
  }
  else if (v==''){
    m = parseFloat(m);
    p = parseFloat(p);
    v = (p/m).toPrecision(5).toString();
    document.getElementById('v').value = v;
  }
  else if (p ==''){
    m = parseFloat(m);
    v = parseFloat(v);
    p = (m*v).toPrecision(5).toString();
    document.getElementById('p').value = p;
  }
}

function CalculateLostKE(m1, v1, m2, v2, v1f, v2f){
  var kei = .5 * m1 * v1**2 + .5 * m2 * v2**2;
  var kef = .5 * m1 * v1f**2 + .5 * m2 * v2f**2;
  return((kef-kei).toPrecision(5).toString());
}

function CalculateInelasticLostKE(m1, v1, m2, v2, vf){
  var kei = .5 * m1 * v1**2 + .5 * m2 * v2**2;
  var kef = .5 * (m1 + m2) * vf **2;
  return(kef-kei);
}

function CalculateInelasticCollision(){
  var m1 = parseFloat(document.getElementById('m1').value);
  var m2 = parseFloat(document.getElementById('m2').value);
  var v1 = parseFloat(document.getElementById('v1').value);
  var v2 = parseFloat(document.getElementById('v2').value);
  var v1f = parseFloat(document.getElementById('v1f').value);
  var v2f = parseFloat(document.getElementById('v2f').value);
  var solveFor = '';
  var error = false;
  var answer = '';



  if (!(isNaN(m1))){
    m1 = parseFloat(m1);
  }
  else{
    solveFor='m1';
  }
  if (!(isNaN(m2))){
    m2 = parseFloat(m2);
  }
  else{
    if (solveFor==''){
      solveFor = 'm2';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v1))){
    v1 = parseFloat(v1);
  }
  else{
    if (solveFor==''){
      solveFor = 'v1';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v2))){
    v2 = parseFloat(v2);
  }
  else{
    if (solveFor==''){
      solveFor = 'v2';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v1f))){
    v1f = parseFloat(v1f);
  }
  else{
    if (solveFor == ''){
      solveFor = 'v1f';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v2f))){
    v2f = parseFloat(v2f);
  }
  else{
    if (solveFor==''){
      solveFor = 'v2f';
    }
    else{
      error = true;
    }
  }

  if (!(error)){

    if (solveFor == 'm1'){
      m1 = ((m2*(v2f-v2))/(v1-v1f));
      answer = m1.toPrecision(5).toString();
      append = 'kg';
    }
    else if (solveFor == 'm2'){
      m2 = ((m1*(v1 - v1f))/(v2f - v2));
      answer = m2.toPrecision(5).toString();
      append = 'kg';
    }
    else if (solveFor == 'v1'){
      v1 = (((m2*(v2f-v2))/m1) + v1f);
      answer = v1.toPrecision(5).toString();
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v2'){
      v2 = (-1*((m1*(v1-v1f))/m2) + v2f);
      answer = v2.toPrecision(5).toString();
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v1f'){
      v1f = (-1*(((m2*(v2f - v2))/m1)-v1));
      answer = v1f.toPrecision(5).toString();
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v2f'){
      v2f = (((m1*(v1-v1f))/m2)+v2);
      answer = v2f.toPrecision(5).toString();
      append = 'ms&#8315&sup1';
    }
    energy = CalculateLostKE(m1, v1, m2, v2, v1f, v2f);
    if (!(solveFor == '')){
        document.getElementById(solveFor).value = answer;
    }
    document.getElementById('energy').innerHTML = (energy + ' Joules');
    document.getElementById('answer').innerHTML = (solveFor + ': ' + answer + ' ' + append);

  }
  else{
    document.getElementById('answer').innerHTML = "Not enough information";
  }
}

function CalculatePerfectlyElasticCollision(){
  var v1 = parseFloat(document.getElementById('v1').value);
  var v2 = parseFloat(document.getElementById('v2').value);
  var v1f = parseFloat(document.getElementById('v1f').value);
  var v2f = parseFloat(document.getElementById('v2f').value);
  var solveFor = '';
  var error = false;
  var answer = '';
  var approach = '';


  if (!(isNaN(v1))){
    v1 = parseFloat(v1);
  }
  else{
    if (solveFor==''){
      solveFor = 'v1';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v2))){
    v2 = parseFloat(v2);
  }
  else{
    if (solveFor==''){
      solveFor = 'v2';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v1f))){
    v1f = parseFloat(v1f);
  }
  else{
    if (solveFor == ''){
      solveFor = 'v1f';
    }
    else{
      error = true;
    }
  }
  if (!(isNaN(v2f))){
    v2f = parseFloat(v2f);
  }
  else{
    if (solveFor==''){
      solveFor = 'v2f';
    }
    else{
      error = true;
    }
  }

  if (!(error)){

    if (solveFor == 'v1'){
      approach = v2f - v1f;
      v1 = v2f - v1f + v2
      answer = v1.toPrecision(5);
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v2'){
      approach = v2f - v1f;
      v2 = v1 + v1f - v2f;
      answer = v2.toPrecision(5);
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v1f'){
      approach = v1 - v2;
      v1f = v2 + v2f - v1;
      answer = v1f.toPrecision(5);
      append = 'ms&#8315&sup1';
    }
    else if (solveFor == 'v2f'){
      approach = v1 - v2;
      v2f = v1 + v1f - v2;
      answer = v2f.toPrecision(5);
      append = 'ms&#8315&sup1';
    }
    if (!(solveFor == '')){
        document.getElementById(solveFor).value = answer;
    }
    document.getElementById('approach').innerHTML = ('Approach/Separation Velocity: ' + approach.toPrecision(5).toString() + 'ms&#8315&sup1');
    document.getElementById('answer').innerHTML = (solveFor + ': ' + answer.toString() + ' ' + append);

  }
  else{
    document.getElementById('answer').innerHTML = "Not enough information";
  }
}

function CalculatePerfectlyInelasticCollision() {
  var m1 = parseFloat(document.getElementById('m1').value);
  var m2 = parseFloat(document.getElementById('m2').value);
  var v1 = parseFloat(document.getElementById('v1').value);
  var v2 = parseFloat(document.getElementById('v2').value);
  var vf = parseFloat(document.getElementById('vf').value);

  var solveFor = '';
  var error = false;
  var answer = '';

  if (!(isNaN(m1))){
    m1 = parseFloat(m1);
  }
  else{
    if (solveFor==''){
      solveFor='m1';
    }
    else{
      error = true;
    }
  }

  if (!(isNaN(m2))){
    m2 = parseFloat(m2);
  }
  else{
    if (solveFor==''){
      solveFor='m2';
    }
    else{
      error = true;
    }
  }

  if (!(isNaN(v1))){
    v1 = parseFloat(v1);
  }
  else{
    if (solveFor==''){
      solveFor = 'v1';
    }
    else{
      error = true;
    }
  }

  if (!(isNaN(v2))){
    v2 = parseFloat(v2);
  }
  else{
    if (solveFor==''){
      solveFor = 'v2';
    }
    else{
      error = true;
    }
  }

  if (!(isNaN(vf))){
    vf = parseFloat(vf);
  }
  else{
    if (solveFor == ''){
      solveFor = 'vf';
    }
    else{
      error = true;
    }
  }

  if (!(error)){
    if (solveFor == 'm1'){
      m1 = ((m2*vf - (m2*v2))/(v1-vf));
      answer = m1.toPrecision(5);
      append = 'kg';
    }

    else if (solveFor == 'm2'){
      m2 = ((m1*v1 - (m1*vf))/(vf - v2));
      answer = m2.toPrecision(5);
      append = 'kg';
    }

    else if (solveFor == 'v1'){
      v1 = ((m1+m2)*vf - (m2*v2))/m1;
      answer = v1.toPrecision(5);
      append = 'ms&#8315&sup1';

    }
    else if (solveFor == 'v2'){
      v2 = ((m1+m2)*vf-(m1*v1))/m2;
      answer = v2.toPrecision(5);
      append = 'ms&#8315&sup1';

    }
    else if (solveFor == 'vf'){
      vf = (m1*v1 + m2*v2)/(m1+m2);
      answer = vf.toPrecision(5);
      append = 'ms&#8315&sup1';
    }
    var energy = CalculateInelasticLostKE(m1,v1,m2,v2,vf);
    if (!(solveFor == '')){
        document.getElementById(solveFor).value = answer;
    }
    document.getElementById('answer').innerHTML = (solveFor + ': ' + answer.toString() + ' ' + append);
    document.getElementById('energy').innerHTML = ('Change in Kinetic Energy: ' + energy.toPrecision(5).toString() + ' Joules');

  }
  else{
    document.getElementById('answer').innerHTML = "Not enough information";
  }
}
