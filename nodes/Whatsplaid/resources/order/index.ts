import type { INodeProperties } from 'n8n-workflow';

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['order'] } },
		options: [
			{ name: 'Get', value: 'get', action: 'Get an order', routing: { request: { method: 'GET', url: '=/ecommerce/orders/{{$parameter.orderId}}' } } },
			{ name: 'Search', value: 'search', action: 'Search orders', description: 'Search the data source configured for the Whatsplaid account', routing: { request: { method: 'GET', url: '/ecommerce/orders/search' } } },
		], default: 'search',
	},
	{ displayName: 'Order ID or Number', name: 'orderId', type: 'string', required: true, default: '', displayOptions: { show: { resource: ['order'], operation: ['get'] } } },
	{ displayName: 'Order Number', name: 'number', type: 'string', default: '', displayOptions: { show: { resource: ['order'], operation: ['search'] } }, routing: { send: { type: 'query', property: 'number' } } },
	{ displayName: 'Email', name: 'email', type: 'string',
																																								placeholder: 'name@email.com', default: '', displayOptions: { show: { resource: ['order'], operation: ['search'] } }, routing: { send: { type: 'query', property: 'email' } } },
	{ displayName: 'Phone', name: 'phone', type: 'string', default: '', displayOptions: { show: { resource: ['order'], operation: ['search'] } }, routing: { send: { type: 'query', property: 'phone' } } },
];
