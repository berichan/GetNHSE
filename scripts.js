var request = new XMLHttpRequest();
request.open('GET', 'https://dev.azure.com/project-pokemon/NHSE/_apis/build/builds?api-version=5.1', true);
request.onload = function () {

  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    let id = data.value[0].id;
	let pc = data.value[0].definition.project.id;
	document.writeln(`<a href="https://dev.azure.com/project-pokemon/NHSE/_apis/build/builds/${id}/artifacts?artifactName=${pc}&api-version=5.1&$format=zip">Click here to download the latest version of NHSE.<\a>`);
  } else {
    document.writeln('Azure is probably down or something idk');
  }
  
  document.writeln('<br><br>');
  document.writeln('Made by <a href="https://github.com/berichan">berichan</a> that has 0 webdev knowledge.');
  document.writeln('Get the source of this website by <a href="https://github.com/berichan/nhsite">clicking here</a>.');
}

request.send();