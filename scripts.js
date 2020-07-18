const deforganization = "project-pokemon";
const defproject = "NHSE";
const defprojurl = "https://github.com/kwsch/NHSE";
const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

// make this a little more portable
var organization = getParameterByName('org');
var project = getParameterByName('proj');
var projurl = getParameterByName('projurl');

if (organization===null || project ===null || projurl ===null)
{
	organization = deforganization;
	project = defproject;
	projurl = defprojurl;
}

document.getElementById("title").innerHTML += `${project} build.`;
document.getElementById("loader").innerHTML += `${project}...`;
document.getElementById("errorhelp").innerHTML += `Go to the <a href="${projurl}">${project} source here</a> or directly to the <a href="https://dev.azure.com/${organization}/${project}/_build?view=runs">Pipelines here</a>.`;

try {
	var request = new XMLHttpRequest();
	var azureUri = `https://dev.azure.com/${organization}/${project}/_apis/build/builds?api-version=5.1`;
	request.open('GET', azureUri, true);
	request.onload = function () {
		if (IsJsonString(this.response))
		{
			try
			{
				var data = JSON.parse(this.response);
				if (request.status >= 200 && request.status < 400) {
					const id = data.value[0].id;
					const pc = data.value[0].definition.project.id;
					const timestamp = new Date(data.value[0].finishTime);
					const timediff = getBuildTimeDifferenceString(timestamp);
					document.getElementById("buildTime").innerHTML =`Build no. ${id} built on ${timestamp} ${timediff}`;	
					document.getElementById("loader").innerHTML =`Click the button below to download the latest version of ${project}.`;
					document.getElementById("getDownload").innerHTML =`<a href="https://dev.azure.com/${organization}/${pc}/_apis/build/builds/${id}/artifacts?artifactName=${project}&api-version=5.1&%24format=zip">Download Latest ${project} Version</a>`;				
				} else {
					document.getElementById("loader").innerHTML ='An error occured';
				}
			}
			catch (err) {
				document.getElementById("loader").innerHTML = err.message;
			}
		}
		else
			document.getElementById("loader").innerHTML = 'No REST json returned. Make sure your parameters are correct!';
	}
	request.send();
}
catch(err) {
	document.getElementById("loader").innerHTML = err.message;
}

function getBuildTimeDifferenceString(timestamp) {
	const timestampToday = new Date();
	const diffDays = Math.floor(Math.abs((timestampToday - timestamp) / oneDay));
	const diffHours = Math.floor(Math.abs((timestampToday - timestamp) / oneHour)) - (diffDays * 24);
	const pluralDays = diffDays === 1 ? '' : 's';
	const pluralHours = diffHours === 1 ? '' : 's';
	
	const dayString = diffDays < 1 ? '' : `${diffDays} day` + pluralDays + ', ';
	
	return `(${dayString}${diffHours} hour${pluralHours} ago)`
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
