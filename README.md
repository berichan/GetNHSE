# GetNHSE

A project/website that originally (and still does, by default) uses Azure API REST requests to grab the latest Pipeline build of [NHSE](https://github.com/kwsch/NHSE) but can be used for any Azure Pipeline.

You may use this by either forking it, or simply adding your own parameters to the URL.

The following parameters are required:

`org`: Your Azure organization.
`proj`: Your Azure project name.
`projurl`: Wherever your source is located.

For example, berichan.github.io/GetNHSE/index.html?org=project-pokemon&proj=NHSE&projurl=https://github.com/kwsch/NHSE will get you the latest Azure Pipeline build for NHSE, and will redirect users directly to the Pipeline/source if anything is going wrong.

Enjoy!
