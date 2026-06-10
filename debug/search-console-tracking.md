# Google Search Console Tracking Sheet

Date created: 2026-06-09

Use this sheet to track onboarding and indexing progress for each subdomain.
Suggested status values: Not Started, In Progress, Submitted, Indexed, Error.

## Quick Checklist

- [ ] Add each subdomain as a URL-prefix property in Google Search Console
- [ ] Submit each sitemap URL
- [ ] Request indexing for each homepage URL
- [ ] Recheck sitemap processing status after 24-48 hours
- [ ] Recheck homepage indexing status after 3-7 days

## Property Tracker

| Subdomain | Property Added | Verification Method | Sitemap URL | Sitemap Submitted | Sitemap Status | Homepage URL | Indexing Requested | Homepage Indexed | Last Checked | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| bci.mindversecomputing.com | Not Started |  | https://bci.mindversecomputing.com/sitemap.xml | No |  | https://bci.mindversecomputing.com/ | No |  |  |  |
| omics.mindversecomputing.com | Not Started |  | https://omics.mindversecomputing.com/sitemap.xml | No |  | https://omics.mindversecomputing.com/ | No |  |  |  |
| matter.mindversecomputing.com | Not Started |  | https://matter.mindversecomputing.com/sitemap.xml | No |  | https://matter.mindversecomputing.com/ | No |  |  |  |
| finance.mindversecomputing.com | Not Started |  | https://finance.mindversecomputing.com/sitemap.xml | No |  | https://finance.mindversecomputing.com/ | No |  |  |  |
| community.mindversecomputing.com | Not Started |  | https://community.mindversecomputing.com/sitemap.xml | No |  | https://community.mindversecomputing.com/ | No |  |  |  |
| learning.mindversecomputing.com | Not Started |  | https://learning.mindversecomputing.com/sitemap.xml | No |  | https://learning.mindversecomputing.com/ | No |  |  |  |
| blogs.mindversecomputing.com | Not Started |  | https://blogs.mindversecomputing.com/sitemap.xml | No |  | https://blogs.mindversecomputing.com/ | No |  |  |  |
| workshops.mindversecomputing.com | Not Started |  | https://workshops.mindversecomputing.com/sitemap.xml | No |  | https://workshops.mindversecomputing.com/ | No |  |  |  |

## Weekly Review Log

| Review Date | Total Properties Added | Total Sitemaps Submitted | Total Homepages Indexed | Open Issues | Actions This Week |
|---|---:|---:|---:|---|---|
| 2026-06-09 | 0 | 0 | 0 |  |  |

## Common Issues and Fix Notes

- Verification failed:
  - Confirm you are signed in with the same Google account that owns the property.
  - Retry URL-prefix property setup with exact https URL.

- Sitemap could not be fetched:
  - Open the sitemap URL in a browser and confirm XML loads.
  - Confirm robots.txt includes the sitemap URL.

- URL not indexed after request:
  - Re-run URL Inspection and check crawl/indexing diagnostics.
  - Confirm canonical points to same URL and page returns HTTP 200.

## Owner and Access

- Primary owner:
- Secondary owner:
- Team access granted on:
