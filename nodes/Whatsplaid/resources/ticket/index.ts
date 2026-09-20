import type { INodeProperties } from 'n8n-workflow';

export const ticketDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['ticket'] } },
		options: [
			{ name: 'Close', value: 'close', action: 'Close a ticket', routing: { request: { method: 'POST', url: '=/tickets/{{$parameter.ticketId}}/close' } } },
			{ name: 'Get', value: 'get', action: 'Get a ticket', routing: { request: { method: 'GET', url: '=/tickets/{{$parameter.ticketId}}' } } },
			{ name: 'Get Many', value: 'getMany', action: 'Get many tickets', routing: { request: { method: 'GET', url: '/tickets' }, output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] } } },
		], default: 'getMany',
	},
	{ displayName: 'Ticket ID', name: 'ticketId', type: 'string', required: true, default: '', displayOptions: { show: { resource: ['ticket'], operation: ['get', 'close'] } } },
	{ displayName: 'Status', name: 'status', type: 'options', options: [{ name: 'All', value: '' }, { name: 'Open', value: 'open' }, { name: 'Closed', value: 'closed' }], default: '', displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'status' } } },
	{ displayName: 'Phone', name: 'phone', type: 'string', default: '', displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'phone' } } },
	{ displayName: 'Created From', name: 'dateFrom', type: 'dateTime', default: '', displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'date_from' } } },
	{ displayName: 'Limit', name: 'limit', type: 'number',
																																								description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 }, default: 50, displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'limit' } } },
	{ displayName: 'Offset', name: 'offset', type: 'number', typeOptions: { minValue: 0 }, default: 0, displayOptions: { show: { resource: ['ticket'], operation: ['getMany'] } }, routing: { send: { type: 'query', property: 'offset' } } },
];
