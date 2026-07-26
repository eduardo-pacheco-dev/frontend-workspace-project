import { createFileRoute, useNavigate, Outlet, useMatches } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
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

interface Station {
  id: number
  status: string
  siteName: string
  siteType: string
  customerSiteId: string
  siteReferenceId: string
  customer: string
  modifiedBy: string
  ziPartner: string
}

const stations: Station[] = [
  { id: 1, status: 'Active', siteName: 'São Paulo Hub', siteType: 'Warehouse', customerSiteId: 'CUST-001', siteReferenceId: 'REF-1001', customer: 'Acme Corp', modifiedBy: 'John Doe', ziPartner: 'ZIP-001' },
  { id: 2, status: 'Active', siteName: 'Rio de Janeiro Branch', siteType: 'Office', customerSiteId: 'CUST-002', siteReferenceId: 'REF-1002', customer: 'Globex Inc', modifiedBy: 'Jane Smith', ziPartner: 'ZIP-002' },
  { id: 3, status: 'Inactive', siteName: 'Belo Horizonte Depot', siteType: 'Depot', customerSiteId: 'CUST-003', siteReferenceId: 'REF-1003', customer: 'Initech', modifiedBy: 'Bob Johnson', ziPartner: 'ZIP-003' },
  { id: 4, status: 'Active', siteName: 'Curitiba Center', siteType: 'Data Center', customerSiteId: 'CUST-004', siteReferenceId: 'REF-1004', customer: 'Umbrella Co', modifiedBy: 'Alice Brown', ziPartner: 'ZIP-004' },
  { id: 5, status: 'Pending', siteName: 'Porto Alegre Unit', siteType: 'Office', customerSiteId: 'CUST-005', siteReferenceId: 'REF-1005', customer: 'Stark Ind', modifiedBy: 'Charlie Wilson', ziPartner: 'ZIP-005' },
  { id: 6, status: 'Active', siteName: 'Brasília HQ', siteType: 'Headquarters', customerSiteId: 'CUST-006', siteReferenceId: 'REF-1006', customer: 'Acme Corp', modifiedBy: 'John Doe', ziPartner: 'ZIP-001' },
  { id: 7, status: 'Inactive', siteName: 'Fortaleza Outpost', siteType: 'Warehouse', customerSiteId: 'CUST-007', siteReferenceId: 'REF-1007', customer: 'Globex Inc', modifiedBy: 'Jane Smith', ziPartner: 'ZIP-002' },
  { id: 8, status: 'Active', siteName: 'Recife Branch', siteType: 'Office', customerSiteId: 'CUST-008', siteReferenceId: 'REF-1008', customer: 'Initech', modifiedBy: 'Bob Johnson', ziPartner: 'ZIP-003' },
]

export const Route = createFileRoute('/_authenticated/admin/stations')({
  component: StationsPage,
})

function StationsPage() {
  const navigate = useNavigate()
  const matches = useMatches()
  const isChildMatch = matches.some((m) => m.routeId === '/_authenticated/admin/stations/$stationId')
  const [data, setData] = useState(stations)
  const [createOpen, setCreateOpen] = useState(false)
  const [newStation, setNewStation] = useState<Record<string, string>>({})
  const [snack, setSnack] = useState({ open: false, message: '' })
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = (a as any)[sortKey] ?? ''
      const bVal = (b as any)[sortKey] ?? ''
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
  }, [data, sortKey, sortDir])

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }: { column: string }) {
    if (sortKey !== column) return <Box component="span" sx={{ ml: 0.5, opacity: 0.3 }}>↕</Box>
    return <Box component="span" sx={{ ml: 0.5 }}>{sortDir === 'asc' ? '↑' : '↓'}</Box>
  }

  if (isChildMatch) {
    return <Outlet />
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Stations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all registered stations and sites.
          </Typography>
        </Box>
        <Button variant="contained" sx={{ borderRadius: 999, flexShrink: 0 }} onClick={() => setCreateOpen(true)}>
          Create
        </Button>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['status', 'siteName', 'siteType', 'customerSiteId', 'siteReferenceId', 'customer', 'modifiedBy', 'ziPartner'].map((col) => (
                    <TableCell
                      key={col}
                      sx={{ fontWeight: 700, cursor: 'pointer', userSelect: 'none' }}
                      onClick={() => toggleSort(col)}
                    >
                      {col === 'siteName' ? 'Site Name' : col === 'siteType' ? 'Site Type' : col === 'customerSiteId' ? 'Customer Site ID' : col === 'siteReferenceId' ? 'Site Reference ID' : col === 'modifiedBy' ? 'Modified By' : col === 'ziPartner' ? 'ZI Partner' : col.charAt(0).toUpperCase() + col.slice(1)}
                      <SortIcon column={col} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.map((station) => (
                  <TableRow
                    key={station.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate({ to: '/admin/stations/$stationId', params: { stationId: String(station.id) } })}
                  >
                    <TableCell>
                      <Chip
                        label={station.status}
                        size="small"
                        color={
                          station.status === 'Active'
                            ? 'success'
                            : station.status === 'Pending'
                              ? 'warning'
                              : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{station.siteName}</TableCell>
                    <TableCell>{station.siteType}</TableCell>
                    <TableCell>{station.customerSiteId}</TableCell>
                    <TableCell>{station.siteReferenceId}</TableCell>
                    <TableCell>{station.customer}</TableCell>
                    <TableCell>{station.modifiedBy}</TableCell>
                    <TableCell>{station.ziPartner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            page={0}
            rowsPerPage={10}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        </CardContent>
      </Card>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create Station</DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            {[
              ['siteName', 'Site Name'],
              ['siteType', 'Site Type'],
              ['customerSiteId', 'Customer Site ID'],
              ['siteReferenceId', 'Site Reference ID'],
              ['customer', 'Customer'],
              ['status', 'Status'],
              ['modifiedBy', 'Modified By'],
              ['ziPartner', 'ZI Partner'],
            ].map(([field, label]) => (
              <Grid size={{ xs: 12, sm: 6 }} key={field}>
                {field === 'status' ? (
                  <TextField label={label} fullWidth size="small" select value={newStation[field] ?? ''} onChange={(e) => setNewStation({ ...newStation, [field]: e.target.value })}>
                    {['Active', 'Inactive', 'Pending'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                  </TextField>
                ) : (
                  <TextField label={label} fullWidth size="small" value={newStation[field] ?? ''} onChange={(e) => setNewStation({ ...newStation, [field]: e.target.value })} />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            const nextId = Math.max(...data.map((d) => d.id), 0) + 1
            setData([...data, {
              id: nextId, status: '', siteName: '', siteType: '', customerSiteId: '',
              siteReferenceId: '', customer: '', modifiedBy: '', ziPartner: '',
              ...newStation,
            }])
            setCreateOpen(false)
            setNewStation({})
            setSnack({ open: true, message: 'Station created successfully.' })
          }}>Create</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  )
}
