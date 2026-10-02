import type { INodeProperties } from 'n8n-workflow';

const request = { resource: ['handoff'], operation: ['request'] };

export const handoffDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['handoff'] } },
		options: [{ name: 'Request', value: 'request', action: 'Request human handoff', routing: { request: { method: 'POST', url: '/handoffs' } } }], default: 'request',
	},
	{ displayName: 'Phone', name: 'phone', type: 'string', required: true, default: '', displayOptions: { show: request }, routing: { send: { type: 'body', property: 'phone' } } },
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: request },
		options: [
			{ displayName: 'Category', name: 'category', type: 'string', default: '', routing: { send: { type: 'body', property: 'category' } } },
			{ displayName: 'Email', name: 'email', type: 'string', placeholder: 'name@email.com', default: '', routing: { send: { type: 'body', property: 'email' } } },
			{ displayName: 'Name', name: 'name', type: 'string', default: '', routing: { send: { type: 'body', property: 'name' } } },
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [{ name: 'High', value: 'high' }, { name: 'Low', value: 'low' }, { name: 'Medium', value: 'medium' }],
				default: 'medium',
				routing: { send: { type: 'body', property: 'priority' } },
			},
			{ displayName: 'Reason', name: 'reason', type: 'string', default: '', routing: { send: { type: 'body', property: 'reason' } } },
		],
	},
];
