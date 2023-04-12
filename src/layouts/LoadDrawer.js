import * as React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Close, MapMarkerOutline } from 'mdi-material-ui';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showLoadSidebar } from 'src/store/apps/load';
import { Typography } from '@mui/material';
import { TimelineConnector, TimelineContent, TimelineItem, TimelineSeparator } from '@mui/lab';
import CustomTimelineDot from 'src/@core/components/mui/timeline-dot'
import MuiTimeline from '@mui/lab/Timeline'
const drawerWidth = 368;

const Timeline = styled(MuiTimeline)({
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop:0,
  marginTop:0,
  paddingBottom:0,
  marginBottom:0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function LoadDrawer() {
  const dispatch = useDispatch()
  const load = useSelector(state => state.load)
  const handleDrawerClose = () => {
    dispatch(showLoadSidebar(null))
  };

  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={Boolean(load.showLoadSidebar)}
      >
        {
          Boolean(load.showLoadSidebar) && <>
            <DrawerHeader sx={{pl:2, pr:2}}>
              <IconButton onClick={handleDrawerClose}>
                <Close/>
              </IconButton>&nbsp;&nbsp;
              <Typography variant='h6'>Load #{load.showLoadSidebar.id}</Typography>
            </DrawerHeader>
            <Divider sx={{mt:0, mb:0}} />
            <Box sx={{p:3}}>
              <Timeline>
                  <TimelineItem>
                    <TimelineSeparator>
                      <CustomTimelineDot skin='light' color='secondary'>
                        <MapMarkerOutline sx={{fontSize:'20px'}} />
                      </CustomTimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator> 
                    <TimelineContent>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          variant='body2'
                          sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
                        >
                          <span>Origin</span>
                        </Typography>

                      </Box>
                      <Typography variant='body1' sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {load.showLoadSidebar.origin.name}, {load.showLoadSidebar.origin.state.abbreviation}
                      </Typography>

                    </TimelineContent> 
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineSeparator>
                      <CustomTimelineDot skin='light' color='success'>
                        <MapMarkerOutline sx={{fontSize:'20px'}} />
                      </CustomTimelineDot>

                    </TimelineSeparator> 
                    <TimelineContent>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography
                          variant='body2'
                          sx={{ mr: 2, fontWeight: 600, color: 'text.secondary', display: 'flex', alignItems: 'center' }}
                        >
                          <span>Destination</span>
                        </Typography>

                      </Box>
                      <Typography variant='body1' sx={{fontWeight: 600, color: 'text.primary' }}>
                        {load.showLoadSidebar.destination.name}, {load.showLoadSidebar.destination.state.abbreviation}
                      </Typography>

                    </TimelineContent> 
                  </TimelineItem>
              </Timeline>
            </Box>
          </>
        }
      </Drawer>
  );
}
