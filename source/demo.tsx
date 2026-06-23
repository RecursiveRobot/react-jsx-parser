/* eslint-disable no-console */
import React from 'react'
import { createRoot } from 'react-dom/client'
import JsxParser from './index'

const container = document.querySelector('#root')!
createRoot(container).render(
	<JsxParser
		autoCloseVoidElements
		jsx={`
			<img src="http://placekitten.com/300/500">
			<div className="foo">bar</div>
		`}
		onError={console.error}
		showWarnings
	/>,
)
