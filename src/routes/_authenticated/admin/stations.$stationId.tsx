import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

interface Station {
  id: number
  customerSiteId: string
  siteReferenceId: string
  name: string
  hideSiteLocation: string
  latitude: string
  longitude: string
  geofenceDistance: string
  geofenceStatus: string
  siteCategory: string
  country: string
  customer: string
  status: string
  timezone: string
  clusterId: string
  clusterName: string
  siteAddress: string
  zipCode: string
  district: string
  region: string
  city: string
  virtualSite: string
  useForOnDuty: string
  priorityMode: string
  siteProfile: string
  contactId: string
  firstName: string
  lastName: string
  fax: string
  email: string
  phone: string
  postalCode: string
  role: string
  remark: string
  site: string
  siteAccessAntennas: string
  siteAccessKeysAfterHours: string
  siteAccessSiteAfterHours: string
  siteAccessKeysOfficeHours: string
  siteAccessSiteOfficeHours: string
  siteDirectionToSite: string
  siteEquipmentLocation: string
  siteSpecialVehicle: string
  ocOrdemComplexa: string
  healthSafetyRiskDetails: string[]
  healthSafetyOtherDetail: string
  siteType: string
  structureType: string
  structureProfile: string
  otherCwDetails: string
  towerOrPoleHeight: string
  equipmentHousing: string
  num2g: string
  num3g: string
  num4g: string
  num5g: string
  healthSafetyRisks: string
  regional: string
  uf: string
  ziPartnerCode: string
  name1: string
  name2: string
  searchTerm: string
  street: string
  cityP20: string
  postalCodeP20: string
  countryP20: string
  created: string
}

const station: Station = {
  id: 1,
  customerSiteId: 'SN-ARNTA7',
  siteReferenceId: 'BR-A-1371889',
  name: 'SN-ARNTA7',
  hideSiteLocation: 'No',
  latitude: '-7.270306',
  longitude: '-48.26225',
  geofenceDistance: '300',
  geofenceStatus: 'Disable',
  siteCategory: 'Nominal',
  country: 'Brazil',
  customer: 'TIM Celular S.A.',
  status: 'Active',
  timezone: 'America/Araguaina',
  clusterId: '-',
  clusterName: '-',
  siteAddress: 'Av.RioBandeira,254-Daiara,Araguaina-TO,7...',
  zipCode: '-',
  district: '-',
  region: '-',
  city: '-',
  virtualSite: 'No',
  useForOnDuty: 'No',
  priorityMode: '-',
  siteProfile: '-',
  contactId: '-',
  firstName: '-',
  lastName: '-',
  fax: '-',
  email: '-',
  phone: '-',
  postalCode: '-',
  role: '-',
  remark: '-',
  site: '-',
  siteAccessAntennas: '-',
  siteAccessKeysAfterHours: '-',
  siteAccessSiteAfterHours: '-',
  siteAccessKeysOfficeHours: '-',
  siteAccessSiteOfficeHours: '-',
  siteDirectionToSite: '-',
  siteEquipmentLocation: '-',
  siteSpecialVehicle: '-',
  ocOrdemComplexa: '1347323',
  healthSafetyRiskDetails: [],
  healthSafetyOtherDetail: 'Please update if Health and Safety Risk Detail "Other" is selected',
  siteType: 'Unknown yet – TBD',
  structureType: 'Unknown yet – TBD',
  structureProfile: 'Unknown yet – TBD',
  otherCwDetails: 'Type here ...',
  towerOrPoleHeight: 'Unknown yet – TBD',
  equipmentHousing: 'Unknown yet – TBD',
  num2g: 'Unknown yet – TBD',
  num3g: 'Unknown yet – TBD',
  num4g: 'Unknown yet – TBD',
  num5g: 'Unknown yet – TBD',
  healthSafetyRisks: 'Unknown yet – TBD',
  regional: 'TCO',
  uf: 'TO',
  ziPartnerCode: '0104040424',
  name1: 'SN-ARNTA7',
  name2: '-',
  searchTerm: 'TIM_SN-ARN',
  street: 'Rua Barão do Rio Branco S/N',
  cityP20: 'Capanema',
  postalCodeP20: '68700-105',
  countryP20: 'BR',
  created: '04-04-2026',
}

export const Route = createFileRoute('/_authenticated/admin/stations/$stationId')({
  component: StationDetailPage,
})

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{value}</Typography>
    </Box>
  )
}

function StationDetailPage() {
  const [data, setData] = useState(station)
  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState<Station | null>(null)
  const [snack, setSnack] = useState({ open: false, message: '' })
  const [tab, setTab] = useState(0)
  const s = data

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
        <Button component={Link} to="/admin/stations" variant="text" sx={{ borderRadius: 999, minWidth: 0, px: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{s.name}</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', mt: 0.25 }}>
            <Typography variant="body2" color="text.secondary">{s.customerSiteId}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Typography variant="body2" color="text.secondary">{s.siteReferenceId}</Typography>
            <Typography variant="body2" color="text.disabled">·</Typography>
            <Chip label={s.status} size="small" color={s.status === 'Active' ? 'success' : s.status === 'Pending' ? 'warning' : 'default'} sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
            <Chip label={s.siteType} size="small" variant="outlined" sx={{ height: 20, '& .MuiChip-label': { fontSize: 11, px: 0.75 } }} />
          </Stack>
        </Box>
        <Button variant="contained" size="small" sx={{ borderRadius: 999, flexShrink: 0 }} onClick={() => { setForm({ ...s }); setEditOpen(true) }}>Edit</Button>
      </Stack>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Basic Details" />
        <Tab label="Site Details" />
        <Tab label="Site Custom Fields" />
        <Tab label="Site Address" />
        <Tab label="P20 Site Details" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Location</Typography>
                <DetailRow label="Latitude" value={s.latitude} />
                <DetailRow label="Longitude" value={s.longitude} />
                <DetailRow label="Country" value={s.country} />
                <DetailRow label="Timezone" value={s.timezone} />
                <DetailRow label="Site Address" value={s.siteAddress} />
                <DetailRow label="Zip Code" value={s.zipCode} />
                <DetailRow label="District" value={s.district} />
                <DetailRow label="Region" value={s.region} />
                <DetailRow label="City" value={s.city} />
                <DetailRow label="Hide Site Location" value={s.hideSiteLocation} />
                <DetailRow label="Geofence Distance (meters)" value={s.geofenceDistance} />
                <DetailRow label="Geofence Distance Status" value={s.geofenceStatus} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>General</Typography>
                <DetailRow label="Customer Site ID" value={s.customerSiteId} />
                <DetailRow label="Site Reference ID" value={s.siteReferenceId} />
                <DetailRow label="Name" value={s.name} />
                <DetailRow label="Site Category" value={s.siteCategory} />
                <DetailRow label="Customer" value={s.customer} />
                <DetailRow label="Status" value={s.status} />
                <DetailRow label="Cluster ID" value={s.clusterId} />
                <DetailRow label="Cluster Name" value={s.clusterName} />
                <DetailRow label="Virtual Site" value={s.virtualSite} />
                <DetailRow label="Use For On Duty Ad Hoc Module" value={s.useForOnDuty} />
                <DetailRow label="Priority Mode" value={s.priorityMode} />
                <DetailRow label="Site Profile" value={s.siteProfile} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Contact</Typography>
                <DetailRow label="Contact Id" value={s.contactId} />
                <DetailRow label="First Name" value={s.firstName} />
                <DetailRow label="Last Name" value={s.lastName} />
                <DetailRow label="Fax" value={s.fax} />
                <DetailRow label="Email" value={s.email} />
                <DetailRow label="Phone" value={s.phone} />
                <DetailRow label="Postal Code" value={s.postalCode} />
                <DetailRow label="Role" value={s.role} />
                <DetailRow label="Remark" value={s.remark} />
                <DetailRow label="Site" value={s.site} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>Access</Typography>
                <DetailRow label="Site Access Antennas" value={s.siteAccessAntennas} />
                <DetailRow label="Site Access Keys After Hours" value={s.siteAccessKeysAfterHours} />
                <DetailRow label="Site Access Site After Hours" value={s.siteAccessSiteAfterHours} />
                <DetailRow label="Site Access Keys Office Hours" value={s.siteAccessKeysOfficeHours} />
                <DetailRow label="Site Access Site Office Hours" value={s.siteAccessSiteOfficeHours} />
                <DetailRow label="Site Direction To Site" value={s.siteDirectionToSite} />
                <DetailRow label="Site Equipment Location" value={s.siteEquipmentLocation} />
                <DetailRow label="Site Special Vehicle" value={s.siteSpecialVehicle} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {tab === 2 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <DetailRow label="OC Ordem Complexa" value={s.ocOrdemComplexa} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.75, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="body2" color="text.secondary">Health and Safety Risk Details</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>
                    {s.healthSafetyRiskDetails.length === 0 ? 'None selected' : s.healthSafetyRiskDetails.join(', ')}
                  </Typography>
                </Box>
                <DetailRow label="Health and Safety Other Detail" value={s.healthSafetyOtherDetail} />
                <DetailRow label="Site Type" value={s.siteType} />
                <DetailRow label="Structure Type" value={s.structureType} />
                <DetailRow label="Structure Profile" value={s.structureProfile} />
                <DetailRow label="Other CW Details" value={s.otherCwDetails} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <DetailRow label="Tower or Pole Height in meters" value={s.towerOrPoleHeight} />
                <DetailRow label="Equipment Housing" value={s.equipmentHousing} />
                <DetailRow label="Number of 2G cells at site" value={s.num2g} />
                <DetailRow label="Number of 3G cells at site" value={s.num3g} />
                <DetailRow label="Number of 4G cells at site" value={s.num4g} />
                <DetailRow label="Number of 5G cells at site" value={s.num5g} />
                <DetailRow label="Site Health and Safety Risks" value={s.healthSafetyRisks} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {tab === 3 && (
        <Card>
          <CardContent sx={{ p: 3 }}>
            <DetailRow label="Regional" value={s.regional} />
            <DetailRow label="UF" value={s.uf} />
          </CardContent>
        </Card>
      )}

      {tab === 4 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <DetailRow label="ZI Partner Code" value={s.ziPartnerCode} />
                <DetailRow label="Name1" value={s.name1} />
                <DetailRow label="Name2" value={s.name2} />
                <DetailRow label="Search Term" value={s.searchTerm} />
                <DetailRow label="Created" value={s.created} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <DetailRow label="Street" value={s.street} />
                <DetailRow label="City" value={s.cityP20} />
                <DetailRow label="Postal Code" value={s.postalCodeP20} />
                <DetailRow label="Country" value={s.countryP20} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Station</DialogTitle>
        {form && (
          <DialogContent>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Name" fullWidth size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Customer Site ID" fullWidth size="small" value={form.customerSiteId} onChange={(e) => setForm({ ...form, customerSiteId: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Site Reference ID" fullWidth size="small" value={form.siteReferenceId} onChange={(e) => setForm({ ...form, siteReferenceId: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Status" fullWidth size="small" select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  {['Active', 'Inactive', 'Pending'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Site Type" fullWidth size="small" value={form.siteType} onChange={(e) => setForm({ ...form, siteType: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Customer" fullWidth size="small" value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Latitude" fullWidth size="small" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Longitude" fullWidth size="small" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Country" fullWidth size="small" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Timezone" fullWidth size="small" value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Site Address" fullWidth size="small" value={form.siteAddress} onChange={(e) => setForm({ ...form, siteAddress: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            if (form) {
              setData(form)
              setEditOpen(false)
              setSnack({ open: true, message: 'Station updated successfully.' })
            }
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  )
}
