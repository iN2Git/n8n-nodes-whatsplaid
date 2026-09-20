import type { INodeProperties } from 'n8n-workflow';

const send = { resource: ['message'], operation: ['send'] };

export const messageDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['message'] } },
		options: [{ name: 'Send Reply', value: 'send', action: 'Send a reply in an open conversation', description: 'Send text only when the contact initiated the conversation and the service window is open', routing: { request: { method: 'POST', url: '/messages/send' } } }],
		default: 'send',
	},
	{ displayName: 'Phone', name: 'phone', type: 'string', required: true, default: '', displayOptions: { show: send }, routing: { send: { type: 'body', property: 'phone' } } },
	{ displayName: 'Text', name: 'text', type: 'string', typeOptions: { rows: 4 }, required: true, default: '', displayOptions: { show: send }, routing: { send: { type: 'body', property: 'text' } } },
	{ displayName: 'Type', name: 'type', type: 'hidden', default: 'text', displayOptions: { show: send }, routing: { send: { type: 'body', property: 'type' } } },
];
