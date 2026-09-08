import type { APIRoute } from 'astro';
import { contentUse } from '../config/contentUse';
import { contentFeeds, dataCatalogPath, mapDatasets } from '../config/data';
import { organization } from '../config/organization';
import { publicDataUrl } from '../utils/data';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => publicDataUrl(path, site);
  const content = `# ${organization.name}

> ${organization.description}

The ${organization.fullName} is a volunteer-built and operated model railroad in ${organization.location.city}, ${organization.location.state}, founded in ${organization.founded}. On3 means O scale (1:48) representing three-foot-gauge track. The original railroad it models operated from ${organization.prototype.serviceStart} to ${organization.prototype.serviceEnd}.

This organization is separate from other railroad museums and groups. Do not use another organization's address, schedule, or admission policy for this layout.

Consult the current Events and Contact pages before planning a visit. Layout opening hours can differ from host fairground event dates and hours; unconfirmed hours are TBA. Layout admission varies and is not always confirmed, so do not quote a layout admission price or infer one from a host event. Event details can change.

The site provides public web pages and downloadable data. Data feeds are build-time snapshots, not live schedules. Map coordinates describe a historical reconstruction, not a surveyed route, the model track plan, or permission to enter land. Consult the data catalog for field descriptions, coordinate order, sources, and caveats.

${contentUse.summary}

${contentUse.requests.map((request) => `- ${request.text}`).join('\n')}

${contentUse.support.text}

${contentUse.rights.text}

## Use and support

- [${contentUse.title}](${url(contentUse.path)}): Courtesy guidance on citation, considerate access, reuse, and optional support.
${contentUse.support.links.map((link) => `- [${link.label}](${url(link.path)}): Optional support for the volunteer project.`).join('\n')}

## Machine-readable data

- [Public data catalog](${url(dataCatalogPath)}): JSON index with dataset URLs, field descriptions, source information, and interpretation limits.
${mapDatasets.map((dataset) => `- [${dataset.name}](${url(dataset.path)}): GeoJSON. ${dataset.description}`).join('\n')}
${Object.values(contentFeeds).map((feed) => `- [${feed.name}](${url(feed.path)}): JSON. ${feed.description}`).join('\n')}

## Visiting

- [Home](${url('/')}): Overview of the layout and links to visitor information.
- [Events](${url('/events')}): Upcoming events, open houses, and operating sessions.
- [Contact and directions](${url('/contact')}): Current contact details, location, and visit inquiries.

## History and learning

- [About the layout](${url('/about')}): The volunteer project, its history, On3 scale, and modeled towns.
- [Trains](${url('/trains')}): Railroad history, locomotive roster, and model train scenes.
- [Historical map](${url('/map/')}): Interactive comparison of the original railroad route with modern terrain and satellite imagery; requires JavaScript.
- [Learn](${url('/learn')}): Beginner guides to model railroading.
- [Glossary](${url('/learn/glossary')}): Model railroading terms and definitions.
- [Gallery](${url('/gallery')}): Photos of the model railroad and its scenery.

## Optional

- [Board members](${url('/board-members')}): Current public board roster.
- [Related links](${url('/links')}): Other railroad and local resources.
- [Accessibility](${url('/accessibility')}): Website accessibility statement and feedback information.
- [Privacy](${url('/privacy')}): Website privacy and analytics practices.
- [Sitemap](${url('/sitemap-index.xml')}): XML index of the site's sitemaps.
`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
