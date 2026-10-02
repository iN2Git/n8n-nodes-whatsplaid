import type { INodeProperties } from 'n8n-workflow';

const getMany = { resource: ['ticket'], operation: ['getMany'] };

export const ticketDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['ticket'] } },
		options: [
			{
				name: 'Close', value: 'close', action: 'Close a ticket',
				routing: { request: { method: 'POST', url: '=/tickets/{{$parameter.ticketId}}/close' } },
			},
			{
				name: 'Get', value: 'get', action: 'Get a ticket',
				routing: { request: { method: 'GET', url: '=/tickets/{{$parameter.ticketId}}' } },
			},
			{
				name: 'Get Many', value: 'getMany', action: 'Get many tickets',
				routing: {
					request: { method: 'GET', url: '/tickets' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }] },
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit', offsetParameter: 'offset', pageSize: 100, type: 'query',
							},
						},
					},
				},
			},
		], default: 'getMany',
	},
	{
		displayName: 'Ticket ID', name: 'ticketId', type: 'string', required: true, default: '',
		displayOptions: { show: { resource: ['ticket'], operation: ['get', 'close'] } },
	},
	{
		displayName: 'Return All', name: 'returnAll', type: 'boolean', default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: getMany }, routing: { send: { paginate: '={{$value}}' } },
	},
	{
		displayName: 'Limit', name: 'limit', type: 'number', default: 50,
		description: 'Max number of results to return', typeOptions: { minValue: 1, maxValue: 100 },
		displayOptions: { show: { resource: ['ticket'], operation: ['getMany'], returnAll: [false] } },
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Filters', name: 'filters', type: 'collection', placeholder: 'Add Filter',
		default: {}, displayOptions: { show: getMany },
		options: [
			{
				displayName: 'Created From', name: 'dateFrom', type: 'dateTime', default: '',
				routing: { send: { type: 'query', property: 'date_from' } },
			},
			{
				displayName: 'Phone', name: 'phone', type: 'string', default: '',
				routing: { send: { type: 'query', property: 'phone' } },
			},
			{
				displayName: 'Status', name: 'status', type: 'options',
				options: [{ name: 'All', value: '' }, { name: 'Closed', value: 'closed' }, { name: 'Open', value: 'open' }],
				default: '', routing: { send: { type: 'query', property: 'status' } },
			},
		],
	},
];
