import type { INodeProperties } from 'n8n-workflow';

const request = { resource: ['handoff'], operation: ['request'] };

export const handoffDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['handoff'] } },
		options: [{ name: 'Request', value: 'request', action: 'Request human handoff', routing: { request: { method: 'POST', url: '/handoffs' } } }], default: 'request',
	},
	{ displayName: 'Phone', name: 'phone', type: 'string', required: true, default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'phone' } } },
	{ displayName: 'Name', name: 'name', type: 'string', default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'name' } } },
	{ displayName: 'Email', name: 'email', type: 'string',
																																								placeholder: 'name@email.com', default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'email' } } },
	{ displayName: 'Reason', name: 'reason', type: 'string', default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'reason' } } },
	{ displayName: 'Category', name: 'category', type: 'string', default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'category' } } },
	{ displayName: 'Priority', name: 'priority', type: 'options', options: [{ name: 'Low', value: 'low' }, { name: 'Medium', value: 'medium' }, { name: 'High', value: 'high' }], default: 'medium', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'priority' } } },
];
