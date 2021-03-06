import test from 'ava'
import { EventEmitter } from 'events'

import { waitForEvent } from '../src'

function newEmitter(eventName, ms, ...args) {
	const emitter = new EventEmitter()
	setTimeout(() => {
		emitter.emit(eventName, ...args)
	}, ms)

	return emitter
}

test('Should wait until event is emitted', async (t) => {
	const emitter = newEmitter('listen', 100)
	const start = Date.now()
	await waitForEvent(emitter, 'listen')
	t.true(Date.now() - start >= 90)
})

test('Should work without parameter', async (t) => {
	const emitter = newEmitter('close', 10, 'foo', 123)
	const res = await waitForEvent(emitter, 'close')
	t.deepEqual(res, ['foo', 123])
})
