import React, { Fragment, useState } from 'react'
import style from '../../styles/universityEmail/Uregister'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import General from '../template/general'
import api from "../../api";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Content = () => {
  const [createinfo, setinfo] = useState({
    localPart: "",
    domainName: ""
  }); 
  const handleSubmit = (e) => {
      console.log(createinfo);
      // api.post("/api/registerUemail", createinfo).then((res) => {
      //   console.log(res);
      //   router.push("/registerUemail");
      //   console.log("PASSPUSH");
      // });
      
  };
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = (e) => {
    e.preventDefault();
    setinfo({ ...createinfo, [e.target.name]: e.target.value });
  };
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Fragment>
      <General>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >

          <Grid>

            <div style={{ padding: 50, background: 'rgba(196, 196, 196, 0.5)' }}>

              <Typography variant="h4" component="h2" style={{ paddingRight: 200, color: '#3D467F' }}>
                Please inform your university E-mail
            </Typography>

              <br></br>
              <Paper style={{
                height: '5px', width: '100%', backgroundColor: '#A880F7', paddingRight: 300
                , opcacity: '50%'
              }}></Paper>

              <Typography variant="body2" style={{ paddingTop: 15, color: '#979797' }}>
                Inform a university E-mail to get a code to verify your account
              </Typography>

              <br></br>
              <Grid container spacing={3}>
                <Grid item xs={6} >
                  <Paper style={{ padding: 10 }}>
                    <form>
                      <InputBase
                        onChange={handleChange}
                        name = "localPart"
                        fullWidth
                        autoFocus
                        type={"text"}
                        value={createinfo.localPart}
                        className={classes.margin}
                        inputProps={{ 'aria-label': 'naked' }}
                      />
                    </form>
                  </Paper>

                </Grid>
                <img src="https://www.flaticon.com/svg/static/icons/svg/159/159036.svg" width="30px"></img>
                <Grid item xs={4} >
                  <Paper style={{ padding: 10 }}>
                    <FormControl fullWidth className={classes.margin}>
                      <InputBase
                        onChange={handleChange}
                        name = "domainName"
                        fullWidth
                        autoFocus
                        type={"text"}
                        value={createinfo.domainName}
                        className={classes.margin}
                        inputProps={{ 'aria-label': 'naked' }}
                      />
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>

              <Typography variant="body2" style={{ paddingTop: 15, color: '#979797' }} >
                example  :  anya858@mail.kmutt.ac.th
    </Typography>
              <Grid container spacing={3} direction="column" alignItems="center"
                justify="center">

                <Grid container spacing={3} direction="row"
                  alignItems="center"
                  justify="center" style={{ marginTop: '20px' }}>

                  <Grid item xs={1} >
                    <Checkbox
                      defaultChecked
                      color="primary"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  </Grid>
                  <Grid item xs={5} >
                    <Typography variant="body2">I have read and accept <a >the term of service.</a></Typography>
                  </Grid>
                </Grid>

                <Grid item xs={6} >
                  <button className="register-button"
                   type="submit"
                   onClick={handleSubmit}>
                    <span className="register-button-text">Submit</span>
                  </button>
                </Grid>

              </Grid>
            </div>


          </Grid>

        </Grid>


      </General>
      <img alt="register-img" src="/images/eduroom_logo_box.svg" width="1152" height="558.6" style={{
        position: 'absolute', left: '657px',
        top: '153px', opacity: 0.3
      }} />
      <style jsx>
        {style}
      </style>
    </Fragment>
  )
}
export default Content

