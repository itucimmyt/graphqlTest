import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import useAxios from "axios-hooks";
import axios from 'axios'

 const client = axios.create({
	baseURL: 'https://sg-test.cimmyt.org:8243/csgraph/0.1.0',
	headers: { Accept: 'application/json', Authorization: `Bearer eyJ4NXQiOiJNRE00TnpZM05HWTBOV0ppTkdNMk1qSmtNams0TlRNME1EUmtNelkwT1RVeU56aGlNakl5WkRKaVpUQm1NbVJpTTJGbFlqSTFZbVl6WW1JelpEVmhNdyIsImtpZCI6Ik1ETTROelkzTkdZME5XSmlOR00yTWpKa01qazROVE0wTURSa016WTBPVFV5TnpoaU1qSXlaREppWlRCbU1tUmlNMkZsWWpJMVltWXpZbUl6WkRWaE13X1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiOTJzRGRWanRMOVlpaFN2cHphb0JoZyIsImh0dHA6XC9cL3dzbzIub3JnXC9jbGFpbXNcL3VzZXJuYW1lIjoieEs1bTh1TGNta2xHc2pvcnVpZHN6WHM2ekxocURfVjJNMXVJS3I2X1V3cyIsInN1YiI6InhLNW04dUxjbWtsR3Nqb3J1aWRzelhzNnpMaHFEX1YyTTF1SUtyNl9Vd3NAY2FyYm9uLnN1cGVyQGNhcmJvbi5zdXBlciIsImh0dHA6XC9cL3dzbzIub3JnXC9jbGFpbXNcL3JvbGUiOlsiZGJkYjU4NmUtYTM0OS00N2FlLWE3ZGQtYTM0ZmMyNDhkMGRmIiwiMjY5ZWQ5ZDYtZDMxMi00ZDBhLWE5NGUtMDQ3Y2M5NmFhNDFmIiwiNzYyMGIyOTktNzVjOC00MGZlLWE3YTktZjA3ZjQyYjA1MTMzIiwiMjM3YzBjN2EtZWJlNC00ZWI2LWFjNTgtZDU3NmZkNjJjN2E5IiwiOTRkNDFmZTItNGU3MC00NzkwLWEyMzgtNWM1YzE0YjI3ODFjIiwiNjVhMmMzMTQtOTc5Ny00ZDhlLWIzYjYtZmQ2MjY1M2I4YThkIiwiYmNkZjljYzAtODAwNS00NzZmLWJiMDUtNzFjOTZmMDM4MWE2IiwiNmVkNzFkYTUtNzBlZS00MWIyLTlmM2UtNjY1ZmYyMTJkNGYyIiwiNDBkMTc2YzctOWFmZS00NjFhLWE1YjAtMDdlNGI1ZGQyMWE3IiwiZTdkZGJjZTgtODhjYi00Yzg3LWI3OGUtYjk4YzNiYzIzZTVlIiwiYjAxN2QxMWItZTQyOS00YjkzLTlmNzQtY2VkNTE3MDBhOTVkIiwiN2QxYTg3MzktYzlhOS00NjA2LTg4NzctZGM5MmVmMDZlYTY4IiwiZTMwZDllMTEtZDViYi00NWIzLWExMTgtNjI4NmQ0ODdkZmJmIiwiYzUzMjUzYmUtMWI2OC00NDIxLWJjMWItYzNjOWFjZWE3YTdjIiwiNGY2Yjg3MGUtMWI2Ni00NGM4LWFjMWMtZjBlMzVmMjRkMjgwIiwiNjFhNTdlZDYtNTJhZi00OTdhLTg1NmUtMDliODllYWEzYzRjIiwiMDY2NjM2MWItYjI5OC00YzIzLWIwYTItNDBiMmQxNWFmMjI3IiwiMTA4MDYxNTMtM2VjYS00Yzg4LWI1NmItOGM3ZmMzMGQ2ZjBjIiwiMGJkYTU3M2ItZTE3OC00ODI0LTk1ZDItNzQ3MGIxYjM0ZWI0Il0sImFtciI6WyJTQU1MU1NPQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvc2ctdGVzdC5jaW1teXQub3JnOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJhdWQiOiJNSDJOZHVTU2tNTTJFMWdPN3JqWkhYZDFqRE1hIiwiY19oYXNoIjoiclFUODBSc0pRSlJQNEhxc0hjc3A5USIsIm5iZiI6MTYxODI0NzkwNywiaHR0cDpcL1wvd3NvMi5vcmdcL2NsYWltc1wvZnVsbG5hbWUiOlsiQlJJT05FUyBQRVJFWVJBIiwiRXJuZXN0byBKb3NlIChDSU1NWVQpIl0sImh0dHA6XC9cL3dzbzIub3JnXC9jbGFpbXNcL2Rpc3BsYXlOYW1lIjoiRS5CUklPTkVTQENJTU1ZVC5PUkciLCJhenAiOiJNSDJOZHVTU2tNTTJFMWdPN3JqWkhYZDFqRE1hIiwiaHR0cDpcL1wvd3NvMi5vcmdcL2NsYWltc1wvZW1haWxhZGRyZXNzIjoiRS5CUklPTkVTQENJTU1ZVC5PUkciLCJleHAiOjE2MTgyNTE1MDcsImlhdCI6MTYxODI0NzkwN30.dHkSDrAvN7-QWFpS88kUbE--3mJl-2GKw69GobEhIL7ijo6fxZ_vVhQYkhM_ghQFYYiun-K1STWATi6iYW9w3gw0mwCwPdnejAcVGNbbeqvLXjSpqz_k2aQHBXBoDPBl3oQ8LI-eAd0fwdg7FCKps7cOUdXYI7h93uVUHQkhmI28yTmtDd1I4lqChu7LmI1QcCSRLF0PwDBe95TORMkPsOl0o4Zj2pRD7TLXK4d-lWa9si7HO0D1e626tCbzhE_sftaDQXlO24MpzyogRqBPDclzFgAjECCrmWLoL2mGDH7_reW7dqu8TlRXWLspoxvrtpkv_z9xRn6_zoLTznM6Xw` }
});
// CORE COMPONENTS AND ATOMS TO USE

const FIND_USER = gql`
  query findUser($id: ID!) {
    findUser(id: $id) {
      id
      userName
    }
  }
`;

const GridMolecule = React.forwardRef((props, ref) => {
  // Properties of the molecule
  const { ...rest } = props;

  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { id: 2 },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log(data);


 // client.post("",{query:`{findUser(id:2){ userName}}`}).then(response =>{console.log(response)}).catch(error=>{console.log(error)})
 
  return <div>Works!! Info:</div>;
});
// Type and required properties
GridMolecule.propTypes = {};
// Default properties
GridMolecule.defaultProps = {};

export default GridMolecule;
