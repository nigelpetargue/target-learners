import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Add, Close, ExpandMore, RemoveCircle } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { supervisoryOrgData } from './data'

const App = () => {
  const [supervisoryOrganization, setSupervisoryOrganization] = useState([
    { id: 0, name: 'Management Department', selected: false, disabled: false },
    { id: 1, name: 'Developement Department', selected: false, disabled: false },
  ])

  const [supervisoryOrgInput, setSupervisoryOrgInput] = useState(supervisoryOrgData)

  const [openForm, setOpenForm] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleCloseForm = () => {
    setOpenForm(false)
    if (checked) {
      setSupervisoryOrganization((prev) => {
        const uniqueItem = supervisoryOrgInput.filter(
          (inputItem) => !prev.some((prevItem) => prevItem.id === inputItem.id)
        )
        return [...prev, ...uniqueItem]
      })
    }
    setSupervisoryOrgInput((prev) =>
      prev.map((item) => ({ ...item, disabled: true, checked: true }))
    )
  }

  const handleRemoveItem = (id) => {
    const filteredList = supervisoryOrganization.filter((item) => item.id !== id)
    setSupervisoryOrganization(filteredList)
    setSupervisoryOrgInput((prev) => {
      const _prev = [...prev]
      const itemIndex = _prev.findIndex((item) => item.id === id)
      _prev[itemIndex].disabled = false
      _prev[itemIndex].selected = false
      return _prev
    })
  }

  return (
    <>
      <Accordion sx={{ width: '660px', px: '20px' }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Supervisory Organization</Typography>
        </AccordionSummary>
        {supervisoryOrganization.map((item, index) => (
          <AccordionDetails
            key={index}
            sx={{
              background: '#fafafa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {item.name}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Switch />
              <IconButton onClick={() => handleRemoveItem(item.id)}>
                <RemoveCircle sx={{ color: 'red' }} />
              </IconButton>
            </Box>
          </AccordionDetails>
        ))}
        <Divider sx={{ mt: 1 }} />
        <Button
          fullWidth
          variant='contained'
          startIcon={<Add />}
          sx={{ my: '20px' }}
          onClick={() => setOpenForm(true)}
        >
          ADD SUP ORG
        </Button>
      </Accordion>

      <Modal
        open={openForm}
        // onClose={handleCloseForm}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,

          boxShadow: 24,
          p: 4,
          '& .MuiBackdrop-root': {
            background: '#fff',
          },
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography>Select Supervisory Organization</Typography>
            <IconButton onClick={handleCloseForm}>
              <Close />
            </IconButton>
          </Box>
          <FormControlLabel
            label='Select all department'
            control={
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked)
                  setSupervisoryOrgInput((prev) =>
                    prev.map((item) => ({
                      ...item,
                      selected: item.disabled ? true : e.target.checked,
                    }))
                  )
                }}
              />
            }
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: 3,
              flex: 1,
            }}
          >
            {supervisoryOrgInput.map((item, index) => (
              <FormControlLabel
                key={index}
                label={item.name}
                control={
                  <Checkbox
                    checked={item.selected}
                    disabled={item.disabled}
                    onChange={(e) =>
                      setSupervisoryOrgInput((prev) => {
                        const _prev = [...prev]
                        _prev[index].selected = e.target.checked
                        return _prev
                      })
                    }
                  />
                }
              />
            ))}
          </Box>
          <Button variant='contained' sx={{ alignSelf: 'flex-end' }} onClick={handleCloseForm}>
            Proceed
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default App
