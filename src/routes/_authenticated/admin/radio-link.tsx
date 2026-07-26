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

export const Route = createFileRoute('/_authenticated/admin/radio-link')({
  component: RadioLinkLayout,
})

function RadioLinkLayout() {
  const navigate = useNavigate()
  const matches = useMatches()
  const isChildMatch = matches.some((m) => m.routeId === '/_authenticated/admin/radio-link/$linkId')
  const [data, setData] = useState(links)
  const [createOpen, setCreateOpen] = useState(false)
  const [newLink, setNewLink] = useState<Record<string, string>>({})
  const [snack, setSnack] = useState({ open: false, message: '' })
  const [sortKey, setSortKey] = useState('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')

  if (isChildMatch) return <Outlet />

  const filtered = useMemo(() => {
    let result = data
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((l) =>
        l.linkName.toLowerCase().includes(q) ||
        l.customer.toLowerCase().includes(q) ||
        l.stationAName.toLowerCase().includes(q) ||
        l.stationBName.toLowerCase().includes(q),
      )
    }
    if (filterStatus) result = result.filter((l) => l.status === filterStatus)
    if (filterType) result = result.filter((l) => l.linkType === filterType)
    return result
  }, [data, search, filterStatus, filterType])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortKey] ?? ''
      const bVal = (b as any)[sortKey] ?? ''
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
  }, [filtered, sortKey, sortDir])

  function toggleSort(key: string) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }

  function SortIcon({ column }: { column: string }) {
    if (sortKey !== column) return <Box component="span" sx={{ ml: 0.5, opacity: 0.3 }}>↕</Box>
    return <Box component="span" sx={{ ml: 0.5 }}>{sortDir === 'asc' ? '↑' : '↓'}</Box>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Radio Links</Typography>
          <Typography variant="body2" color="text.secondary">Manage all radio links between stations.</Typography>
        </Box>
        <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => setCreateOpen(true)}>Create</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        <TextField placeholder="Search links..." size="small" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ minWidth: 240 }} />
        <TextField select size="small" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ minWidth: 140 }}>
          <MenuItem value="">All status</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
        </TextField>
        <TextField select size="small" value={filterType} onChange={(e) => setFilterType(e.target.value)} sx={{ minWidth: 160 }}>
          <MenuItem value="">All types</MenuItem>
          {[...new Set(data.map((l) => l.linkType))].map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
      </Box>

      <Card>
        <CardContent sx={{ p: 3 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {['status', 'linkName', 'linkType', 'frequency', 'distance', 'stationAName', 'stationBName', 'customer', 'modifiedBy'].map((col) => (
                    <TableCell key={col} sx={{ fontWeight: 700, cursor: 'pointer', userSelect: 'none' }} onClick={() => toggleSort(col)}>
                      {col === 'linkName' ? 'Link Name' : col === 'linkType' ? 'Link Type' : col === 'stationAName' ? 'Station A' : col === 'stationBName' ? 'Station B' : col === 'modifiedBy' ? 'Modified By' : col.charAt(0).toUpperCase() + col.slice(1)}
                      <SortIcon column={col} />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sorted.map((link) => (
                  <TableRow key={link.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate({ to: '/admin/radio-link/$linkId', params: { linkId: String(link.id) } })}>
                    <TableCell><Chip label={link.status} size="small" color={link.status === 'Active' ? 'success' : link.status === 'Pending' ? 'warning' : 'default'} /></TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{link.linkName}</TableCell>
                    <TableCell><Chip label={link.linkType} size="small" variant="outlined" /></TableCell>
                    <TableCell>{link.frequency}</TableCell>
                    <TableCell>{link.distance}</TableCell>
                    <TableCell>{link.stationAName}</TableCell>
                    <TableCell>{link.stationBName}</TableCell>
                    <TableCell>{link.customer}</TableCell>
                    <TableCell>{link.modifiedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination component="div" count={filtered.length} page={0} rowsPerPage={10} rowsPerPageOptions={[5, 10, 25]} onPageChange={() => {}} onRowsPerPageChange={() => {}} />
        </CardContent>
      </Card>

      <Box component="footer" sx={{ mt: 4, pt: 3, pb: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Typography>
        <Typography variant="caption" color="text.disabled">{data.length} radio links</Typography>
      </Box>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="md" fullWidth slotProps={{ paper: { sx: { borderRadius: 3 } } }}>
        <DialogTitle sx={{ fontWeight: 700 }}>Create Radio Link</DialogTitle>
        <DialogContent>
          <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
            {[['linkName', 'Link Name'], ['linkType', 'Link Type'], ['frequency', 'Frequency'], ['distance', 'Distance'], ['stationAName', 'Station A'], ['stationASiteId', 'Station A Site ID'], ['stationBName', 'Station B'], ['stationBSiteId', 'Station B Site ID'], ['customer', 'Customer'], ['status', 'Status'], ['modifiedBy', 'Modified By']].map(([field, label]) => (
              <Grid size={{ xs: 12, sm: 6 }} key={field}>
                {field === 'status' ? (
                  <TextField label={label} fullWidth size="small" select value={newLink[field] ?? ''} onChange={(e) => setNewLink({ ...newLink, [field]: e.target.value })}>
                    {['Active', 'Inactive', 'Pending'].map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                  </TextField>
                ) : (
                  <TextField label={label} fullWidth size="small" value={newLink[field] ?? ''} onChange={(e) => setNewLink({ ...newLink, [field]: e.target.value })} />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateOpen(false)} sx={{ borderRadius: 999 }}>Cancel</Button>
          <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => {
            const nextId = Math.max(...data.map((d) => d.id), 0) + 1
            setData([...data, { id: nextId, status: '', linkName: '', linkType: '', frequency: '', distance: '', stationAName: '', stationASiteId: '', stationBName: '', stationBSiteId: '', customer: '', modifiedBy: '', ...newLink }])
            setCreateOpen(false)
            setNewLink({})
            setSnack({ open: true, message: 'Radio link created successfully.' })
          }}>Create</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ open: false, message: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  )
}
