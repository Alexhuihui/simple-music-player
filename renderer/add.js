const {ipcRenderer} = require('electron')
const path = require('path')
let musicFilesPath = []

document.getElementById('select-music').addEventListener('click', () => {
	ipcRenderer.send('open-music-file')
})

document.getElementById('add-music').addEventListener('click', () => {
	ipcRenderer.send('add-tracks', musicFilesPath)
})

const renderListHTML = (paths) => {
	const musicList = document.getElementById('musicList')
	const musicItemsHTMl = paths.reduce((html, music) => {
		html += `<li class="list-group-item">${path.basename(music)}</li>`
		return html
	}, '')
	musicList.innerHTML = `<ul class="list-group">${musicItemsHTMl}</ul>`
}

//监听main.js发来的selected-file的事件
ipcRenderer.on('selected-file', (event, path) => {
	if (Array.isArray(path)) {
		musicFilesPath = path
		renderListHTML(musicFilesPath)
	}
})