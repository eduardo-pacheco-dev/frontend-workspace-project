import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'

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

interface CompanyResponse {
  data: Company[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const mockCompanies: CompanyResponse = {
  data: [
    { id: 1, name: 'Acme Technology LLC', cnpj: '12.345.678/0001-95', tradeName: 'Acme Tech', openingDate: '2020-01-15', companySize: 'LLC', registrationStatus: 'Active', address: '123 Main Street, Suite 100, São Paulo, SP', phone: '+55 11 99999-1234', email: 'contact@acmetech.com.br' },
    { id: 2, name: 'Globex Corporation', cnpj: '98.765.432/0001-10', tradeName: 'Globex', openingDate: '2018-06-22', companySize: 'Corporation', registrationStatus: 'Active', address: '456 Oak Avenue, Rio de Janeiro, RJ', phone: '+55 21 98888-5678', email: 'info@globexcorp.com.br' },
    { id: 3, name: 'Initech Solutions Ltda', cnpj: '45.678.901/0001-23', tradeName: 'Initech', openingDate: '2022-03-01', companySize: 'Ltda', registrationStatus: 'Pending', address: '789 Pine Road, Belo Horizonte, MG', phone: '+55 31 97777-9012', email: 'contact@initech.com.br' },
    { id: 4, name: 'Umbrella Holdings S.A.', cnpj: '11.222.333/0001-44', tradeName: 'Umbrella', openingDate: '2015-11-30', companySize: 'SA', registrationStatus: 'Active', address: '321 Cedar Lane, Curitiba, PR', phone: '+55 41 96666-3456', email: 'admin@umbrella.com.br' },
    { id: 5, name: 'Stark Industries Brasil', cnpj: '55.666.777/0001-88', tradeName: 'Stark BR', openingDate: '2023-07-10', companySize: 'LLC', registrationStatus: 'Inactive', address: '654 Maple Drive, Porto Alegre, RS', phone: '+55 51 95555-7890', email: 'contact@starkbr.com.br' },
  ],
  total: 5,
  page: 0,
  limit: 10,
  totalPages: 1,
}

export const Route = createFileRoute('/_authenticated/admin/management/')({
  component: ManagementPage,
})

function ManagementPage() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState(mockCompanies.data)
  const [editOpen, setEditOpen] = useState(false)
  const [editing, setEditing] = useState<Company | null>(null)
  const [createOpen, setCreating] = useState(false)
  const [newCompany, setNewCompany] = useState<Partial<Company>>({})
  const [snack, setSnack] = useState({ open: false, message: '' })
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
  ])
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [newUser, setNewUser] = useState<Partial<{ id: number; name: string; email: string; role: string; status: string }>>({})
  const first = companies[0]
  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        Companies
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage registered companies.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Company Details
              </Typography>
              <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{first.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{first.tradeName} · {first.cnpj}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={first.registrationStatus} size="small" color={first.registrationStatus === 'Active' ? 'success' : first.registrationStatus === 'Pending' ? 'warning' : 'default'} />
                      <Button size="small" variant="outlined" sx={{ borderRadius: 999 }} onClick={() => { setEditing({ ...first }); setEditOpen(true) }}>
                        Edit
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                    {[
                      { label: 'Opening Date', value: first.openingDate },
                      { label: 'Company Size', value: first.companySize },
                      { label: 'Email', value: first.email },
                      { label: 'Phone', value: first.phone },
                    ].map((item) => (
                      <Box key={item.label}>
                        <Typography variant="caption" color="text.secondary">{item.label}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">Address</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{first.address}</Typography>
                  </Box>
                </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  All Companies
                </Typography>
                <Button size="small" variant="contained" sx={{ borderRadius: 999 }} onClick={() => setCreating(true)}>
                  Create
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>CNPJ</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Trade Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow
                        key={company.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate({ to: '/admin/management/companies/$companyId', params: { companyId: String(company.id) } })}
                      >
                        <TableCell>{company.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{company.name}</TableCell>
                        <TableCell>{company.cnpj}</TableCell>
                        <TableCell>{company.tradeName}</TableCell>
                        <TableCell>
                          <Chip
                            label={company.registrationStatus}
                            size="small"
                            color={
                              company.registrationStatus === 'Active'
                                ? 'success'
                                : company.registrationStatus === 'Pending'
                                  ? 'warning'
                                  : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell>{company.companySize}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell>{company.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={mockCompanies.total}
                page={mockCompanies.page}
                rowsPerPage={mockCompanies.limit}
                rowsPerPageOptions={[5, 10, 25]}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  All Users
                </Typography>
                <Button size="small" variant="contained" sx={{ borderRadius: 999 }} onClick={() => setCreateUserOpen(true)}>
                  Create
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user.id}
                        hover
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate({ to: '/admin/management/users/$userId', params: { userId: String(user.id) } })}
                      >
                        <TableCell>{user.id}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip label={user.role} size="small" variant="outlined" color={user.role === 'Admin' ? 'primary' : 'default'} />
                        </TableCell>
                        <TableCell>
                          <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'default'} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Edit Company</DialogTitle>
        {editing && (
          <DialogContent>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Legal Name" fullWidth size="small" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Trade Name" fullWidth size="small" value={editing.tradeName} onChange={(e) => setEditing({ ...editing, tradeName: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="CNPJ" fullWidth size="small" value={editing.cnpj} onChange={(e) => setEditing({ ...editing, cnpj: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Opening Date" fullWidth size="small" type="date" value={editing.openingDate} onChange={(e) => setEditing({ ...editing, openingDate: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Company Size" fullWidth size="small" select value={editing.companySize} onChange={(e) => setEditing({ ...editing, companySize: e.target.value })}>
                  {['LLC', 'Ltda', 'SA', 'Corporation', 'Individual'].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Registration Status" fullWidth size="small" select value={editing.registrationStatus} onChange={(e) => setEditing({ ...editing, registrationStatus: e.target.value })}>
                  {['Active', 'Pending', 'Inactive'].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Address" fullWidth size="small" value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Phone" fullWidth size="small" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField label="Email" fullWidth size="small" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            if (editing) {
              setCompanies((prev) => prev.map((c) => (c.id === editing.id ? editing : c)))
              setEditOpen(false)
              setSnack({ open: true, message: 'Company updated successfully.' })
            }
          }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createUserOpen} onClose={() => setCreateUserOpen(false)} maxWidth="sm" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12 }}>
              <TextField label="Name" fullWidth size="small" value={newUser.name ?? ''} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Email" fullWidth size="small" type="email" value={newUser.email ?? ''} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Role" fullWidth size="small" select value={newUser.role ?? ''} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                {['Admin', 'Editor', 'Viewer'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Status" fullWidth size="small" select value={newUser.status ?? ''} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
                {['Active', 'Inactive'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateUserOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            const nextId = Math.max(...users.map((u) => u.id), 0) + 1
            setUsers([...users, { id: nextId, name: '', email: '', role: '', status: '', ...newUser }])
            setCreateUserOpen(false)
            setNewUser({})
            setSnack({ open: true, message: 'User created successfully.' })
          }}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createOpen} onClose={() => setCreating(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create Company</DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Legal Name" fullWidth size="small" value={newCompany.name ?? ''} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Trade Name" fullWidth size="small" value={newCompany.tradeName ?? ''} onChange={(e) => setNewCompany({ ...newCompany, tradeName: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="CNPJ" fullWidth size="small" value={newCompany.cnpj ?? ''} onChange={(e) => setNewCompany({ ...newCompany, cnpj: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Opening Date" fullWidth size="small" type="date" value={newCompany.openingDate ?? ''} onChange={(e) => setNewCompany({ ...newCompany, openingDate: e.target.value })} slotProps={{ inputLabel: { shrink: true } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Company Size" fullWidth size="small" select value={newCompany.companySize ?? ''} onChange={(e) => setNewCompany({ ...newCompany, companySize: e.target.value })}>
                {['LLC', 'Ltda', 'SA', 'Corporation', 'Individual'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Registration Status" fullWidth size="small" select value={newCompany.registrationStatus ?? ''} onChange={(e) => setNewCompany({ ...newCompany, registrationStatus: e.target.value })}>
                {['Active', 'Pending', 'Inactive'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField label="Address" fullWidth size="small" value={newCompany.address ?? ''} onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Phone" fullWidth size="small" value={newCompany.phone ?? ''} onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField label="Email" fullWidth size="small" type="email" value={newCompany.email ?? ''} onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreating(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            const nextId = Math.max(...companies.map((c) => c.id), 0) + 1
            setCompanies([...companies, { id: nextId, name: '', tradeName: '', cnpj: '', openingDate: '', companySize: '', registrationStatus: '', address: '', phone: '', email: '', ...newCompany }])
            setCreating(false)
            setNewCompany({})
            setSnack({ open: true, message: 'Company created successfully.' })
          }}>Create</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>

      <Box
        component="footer"
        sx={{
          mt: 6,
          pt: 3,
          pb: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="caption" color="text.disabled">
          {companies.length} companies · {users.length} users
        </Typography>
      </Box>
    </Box>
  )
}
