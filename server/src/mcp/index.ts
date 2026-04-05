import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { prisma } from '../lib/prisma';
import { getDailyParable } from '../lib/daily';

const server = new McpServer({
  name: 'sagewayai',
  version: '1.0.0',
});

server.tool(
  'get_daily_parable',
  'Get today\'s parable of the day. Uses the LRU selection strategy — picks an unused parable or the least recently used one.',
  {},
  async () => {
    const parable = await getDailyParable();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(parable, null, 2),
        },
      ],
    };
  },
);

server.tool(
  'get_parable_stats',
  'Get statistics about the parable library: total count, per-category breakdown, and how many have been used as daily parables.',
  {},
  async () => {
    const [total, categories, usedAsDailyCount, recentDailies] = await Promise.all([
      prisma.parable.count(),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
        select: { name: true, slug: true, parablesCount: true },
      }),
      prisma.parable.count({ where: { dailies: { some: {} } } }),
      prisma.dailyParable.findMany({
        orderBy: { date: 'desc' },
        take: 7,
        include: { parable: { select: { title: true, categoryId: true } } },
      }),
    ]);

    const stats = {
      total,
      usedAsDaily: usedAsDailyCount,
      neverUsedAsDaily: total - usedAsDailyCount,
      categories,
      last7Days: recentDailies.map((d) => ({
        date: d.date,
        title: d.parable.title,
      })),
    };

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  },
);

server.tool(
  'get_parable_by_id',
  'Get a single parable by its ID.',
  { id: z.string().describe('The parable ID (cuid)') },
  async ({ id }) => {
    const parable = await prisma.parable.findUnique({ where: { id } });
    if (!parable) {
      return {
        content: [{ type: 'text', text: `Parable with id "${id}" not found.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(parable, null, 2) }],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
