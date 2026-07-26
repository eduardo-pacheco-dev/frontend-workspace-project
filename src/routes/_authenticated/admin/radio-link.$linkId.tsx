import { createFileRoute, Link } from '@tanstack/react-router'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface RadioLink {
  id: number
  status: string
  linkName: string
  linkType: string
  frequency: string
  distance: string
  stationAName: string
  stationASiteId: string
  stationBName: string
  stationBSiteId: string
  customer: string
  modifiedBy: string
}

const links: RadioLink[] = [
  { id: 1, status: 'Active', linkName: 'SP-RJ Link', linkType: 'Microwave', frequency: '23 GHz', distance: '12.5 km', stationAName: 'São Paulo Hub', stationASiteId: 'CUST-001', stationBName: 'Rio de Janeiro Branch', stationBSiteId: 'CUST-002', customer: 'Acme Corp', modifiedBy: 'John Doe' },
  { id: 2, status: 'Active', linkName: 'BH-VIX Link', linkType: 'Fiber', frequency: '—', distance: '85.0 km', stationAName: 'Belo Horizonte Depot', stationASiteId: 'CUST-003', stationBName: 'Vitória Station', stationBSiteId: 'CUST-009', customer: 'Initech', modifiedBy: 'Jane Smith' },
  { id: 3, status: 'Pending', linkName: 'CTB-POA Link', linkType: 'Microwave', frequency: '18 GHz', distance: '32.0 km', stationAName: 'Curitiba Center', stationASiteId: 'CUST-004', stationBName: 'Porto Alegre Unit', stationBSiteId: 'CUST-005', customer: 'Umbrella Co', modifiedBy: 'Alice Brown' },
  { id: 4, status: 'Inactive', linkName: 'BSB-DF Link', linkType: 'Satellite', frequency: 'Ku-band', distance: '—', stationAName: 'Brasília HQ', stationASiteId: 'CUST-006', stationBName: 'Fortaleza Outpost', stationBSiteId: 'CUST-007', customer: 'Acme Corp', modifiedBy: 'Charlie Wilson' },
  { id: 5, status: 'Active', linkName: 'REC-SSA Link', linkType: 'Fiber', frequency: '—', distance: '48.3 km', stationAName: 'Recife Branch', stationASiteId: 'CUST-008', stationBName: 'Salvador Station', stationBSiteId: 'CUST-010', customer: 'Globex Inc', modifiedBy: 'John Doe' },
]

export const Route = createFileRoute('/_authenticated/admin/radio-link/$linkId')({
  component: RadioLinkDetailPage,
})

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value}</Typography>
    </Box>
  )
}

function RadioLinkDetailPage() {
  const { linkId } = Route.useParams()
  const id = Number(linkId)
  const link = links.find((l) => l.id === id)

  if (!link) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Radio Link not found</Typography>
        <Button component={Link} to="/admin/radio-link" variant="outlined" sx={{ borderRadius: 999 }}>Back to Radio Links</Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button component={Link} to="/admin/radio-link" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{link.linkName}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', mt: 0.25 }}>
            <Chip label={link.status} size="small" color={link.status === 'Active' ? 'success' : link.status === 'Pending' ? 'warning' : 'default'} sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Chip label={link.linkType} size="small" variant="outlined" sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Typography variant="body2" color="text.secondary">{link.frequency}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Typography variant="body2" color="text.secondary">{link.distance}</Typography>
          </Stack>
        </Box>
        <Button variant="contained" size="small" sx={{ borderRadius: 999 }}>Edit</Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Station A</Typography>
              <DetailRow label="Name" value={link.stationAName} />
              <DetailRow label="Site ID" value={link.stationASiteId} />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Station B</Typography>
              <DetailRow label="Name" value={link.stationBName} />
              <DetailRow label="Site ID" value={link.stationBSiteId} />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Link Details</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailRow label="Link Name" value={link.linkName} />
                  <DetailRow label="Link Type" value={link.linkType} />
                  <DetailRow label="Frequency" value={link.frequency} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailRow label="Distance" value={link.distance} />
                  <DetailRow label="Customer" value={link.customer} />
                  <DetailRow label="Modified By" value={link.modifiedBy} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
