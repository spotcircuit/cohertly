# Cohertly v2 Development

This document outlines the structure and development approach for Cohertly v2, which focuses on enhanced referral network management, data enrichment, and intelligent recommendations.

## Getting Started with v2 Development

### Running v2 in Development Mode

```bash
# Run v2 on port 3001
npm run dev:v2

# Or to use the standard port but with v2 features enabled
# 1. Set NEXT_PUBLIC_V2_MODE=true in .env.development
# 2. Run the standard dev command
npm run dev
```

### Branch Structure

- `main` - Production branch with v1 code
- `v2-development` - Development branch for v2 features

### Directory Structure

```
/src
  /components
    /v2           # New v2 components
  /pages
    /v2           # New v2 pages
  /utils
    featureFlags.ts  # Feature flag system for v2
```

## Key v2 Features

1. **Referral Network Management**
   - Network visualization
   - Relationship strength indicators
   - Activity tracking
   - Quick referral actions

2. **Data Enrichment**
   - Minimal input onboarding
   - Progressive data enrichment
   - Integration with external data sources
   - Privacy controls

3. **Smart CRM Integration**
   - Bi-directional sync
   - Conflict resolution
   - Activity logging

4. **Transparent Recommendation Engine**
   - Multi-factor matching
   - Explanation UI
   - Feedback loop

5. **Meeting & Follow-up Enhancement**
   - Smart reminders
   - Pre-meeting briefs
   - Post-meeting actions
   - Referral tracking

## Feature Flags

V2 uses a feature flag system to gradually roll out new features. These can be toggled in `.env.development`:

```
NEXT_PUBLIC_V2_MODE=true
NEXT_PUBLIC_ENABLE_DATA_ENRICHMENT=true
NEXT_PUBLIC_ENABLE_NETWORK_VISUALIZATION=true
NEXT_PUBLIC_ENABLE_SMART_RECOMMENDATIONS=true
NEXT_PUBLIC_ENABLE_CRM_INTEGRATION=true
```

## Cross-Referral Grid

The v2 recommendation engine is built around a comprehensive cross-referral grid that maps relationships between different professional service providers:

| Professional Service | Common Referral Partners |
|---------------------|--------------------------|
| Estate Planning Attorney | Wealth Managers, CPAs, Financial Advisors, Insurance Agents |
| Wealth Manager/Financial Advisor | Estate Planning Attorneys, CPAs, Tax Attorneys, Insurance Agents |
| CPA | Financial Advisors, Estate Planning Attorneys, Business Attorneys |
| Business Attorney | CPAs, Business Consultants, Commercial Realtors |
| Mortgage Broker | Real Estate Agents, Title Companies, Insurance Agents |
| Insurance Agent | Financial Advisors, Mortgage Brokers, Estate Planning Attorneys |
| Commercial Realtor | Commercial Lenders, Business Attorneys, Insurance Brokers |
| Residential Real Estate Agent | Mortgage Brokers, Home Inspectors, Insurance Agents |
| Family Law Attorney | Financial Advisors, Therapists/Counselors, Real Estate Agents |
| Bankruptcy Attorney | CPAs, Credit Counselors, Financial Advisors |
| Business Consultant | CPAs, Business Attorneys, Commercial Realtors |
| Elder Law Attorney | Senior Living Facilities, Estate Planning Attorneys |
| Personal Injury Attorney | Chiropractors, Physical Therapists, Doctors |
| IT Consultant | Business Consultants, CPAs, Cybersecurity Specialists |

## Development Approach

1. **Phase 1 (MVP+)**: Core network management + basic enrichment + CRM integration
2. **Phase 2**: Enhanced enrichment + recommendation engine improvements
3. **Phase 3**: Meeting enhancements + advanced analytics
4. **Phase 4**: Network growth features + expanded verticals
