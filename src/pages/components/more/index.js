// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Data Imports

const Misc = () => {
  return (
    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='More Components' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <Alert severity='info' sx={{ mb: 4 }}>
              We have themed each of the MUI components but we have skipped the demos of the following components. User
              can always copy component's code and use from links given below.
            </Alert>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Components</TableCell>
                    <TableCell>Links</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
            
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Misc
