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

interface Company {
  id: number
  name: string
  cnpj: string
  tradeName: string
  openingDate: string
  companySize: string
  registrationStatus: string
  address: string
  phone: string
  email: string
}

const companies: Company[] = [
  { id: 1, name: 'Acme Technology LLC', cnpj: '12.345.678/0001-95', tradeName: 'Acme Tech', openingDate: '2020-01-15', companySize: 'LLC', registrationStatus: 'Active', address: '123 Main Street, Suite 100, São Paulo, SP', phone: '+55 11 99999-1234', email: 'contact@acmetech.com.br' },
  { id: 2, name: 'Globex Corporation', cnpj: '98.765.432/0001-10', tradeName: 'Globex', openingDate: '2018-06-22', companySize: 'Corporation', registrationStatus: 'Active', address: '456 Oak Avenue, Rio de Janeiro, RJ', phone: '+55 21 98888-5678', email: 'info@globexcorp.com.br' },
  { id: 3, name: 'Initech Solutions Ltda', cnpj: '45.678.901/0001-23', tradeName: 'Initech', openingDate: '2022-03-01', companySize: 'Ltda', registrationStatus: 'Pending', address: '789 Pine Road, Belo Horizonte, MG', phone: '+55 31 97777-9012', email: 'contact@initech.com.br' },
  { id: 4, name: 'Umbrella Holdings S.A.', cnpj: '11.222.333/0001-44', tradeName: 'Umbrella', openingDate: '2015-11-30', companySize: 'SA', registrationStatus: 'Active', address: '321 Cedar Lane, Curitiba, PR', phone: '+55 41 96666-3456', email: 'admin@umbrella.com.br' },
  { id: 5, name: 'Stark Industries Brasil', cnpj: '55.666.777/0001-88', tradeName: 'Stark BR', openingDate: '2023-07-10', companySize: 'LLC', registrationStatus: 'Inactive', address: '654 Maple Drive, Porto Alegre, RS', phone: '+55 51 95555-7890', email: 'contact@starkbr.com.br' },
]

export const Route = createFileRoute('/_authenticated/admin/management/companies/$companyId')({
  component: CompanyDetailPage,
})

function CompanyDetailPage() {
  const { companyId } = Route.useParams()
  const id = Number(companyId)
  const [company, setCompany] = useState(companies.find((c) => c.id === id) ?? null)
  const [editOpen, setEditOpen] = useState(false)
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({ open: false, message: '' })
  const [form, setForm] = useState<Company | null>(null)

  if (!company) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Company not found
        </Typography>
        <Button component={Link} to="/admin/management" variant="outlined" sx={{ borderRadius: 999 }}>
          Back to management
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
        <Button
          component={Link}
          to="/admin/management"
          variant="text"
          sx={{ borderRadius: 999, minWidth: 0, px: 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Button>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.tradeName} · {company.cnpj}
          </Typography>
        </Box>
        <Chip
          label={company.registrationStatus}
          color={
            company.registrationStatus === 'Active'
              ? 'success'
              : company.registrationStatus === 'Pending'
                ? 'warning'
                : 'default'
          }
          sx={{ ml: 'auto' }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ borderRadius: 999, flexShrink: 0 }}
          onClick={() => {
            setForm({ ...company })
            setEditOpen(true)
          }}
        >
          Edit
        </Button>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Company Information
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Legal Name', value: company.name },
                  { label: 'Trade Name', value: company.tradeName },
                  { label: 'CNPJ', value: company.cnpj },
                  { label: 'Company Size', value: company.companySize },
                  { label: 'Opening Date', value: company.openingDate },
                  { label: 'Registration Status', value: company.registrationStatus },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Contact Information
              </Typography>
              <Stack spacing={2}>
                {[
                  { label: 'Email', value: company.email },
                  { label: 'Phone', value: company.phone },
                  { label: 'Address', value: company.address },
                ].map((item) => (
                  <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{item.value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="md"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Company</DialogTitle>
        {form && (
          <DialogContent>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Legal Name" fullWidth size="small" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Trade Name" fullWidth size="small" value={form.tradeName} onChange={(e) => setForm({ ...form, tradeName: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="CNPJ" fullWidth size="small" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Opening Date" fullWidth size="small" type="date" value={form.openingDate} onChange={(e) => setForm({ ...form, openingDate: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Company Size" fullWidth size="small" select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}>
                  {['LLC', 'Ltda', 'SA', 'Corporation', 'Individual'].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Registration Status" fullWidth size="small" select value={form.registrationStatus} onChange={(e) => setForm({ ...form, registrationStatus: e.target.value })}>
                  {['Active', 'Pending', 'Inactive'].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Address" fullWidth size="small" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Phone" fullWidth size="small" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Email" fullWidth size="small" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ borderRadius: 999 }}
            onClick={() => {
              if (form) {
                setCompany(form)
                setEditOpen(false)
                setSnack({ open: true, message: 'Company updated successfully.' })
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
