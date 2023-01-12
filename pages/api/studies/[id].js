export default function handler(req, res) {
  const {
    query: { PatientID, PatientName },
  } = req;
  console.log("PatientID, PatientName", [PatientID, PatientName]);
  const dcmjsDimse = require("dcmjs-dimse");
  const { Client, Server, Scp, Dataset } = dcmjsDimse;
  const { CFindRequest } = dcmjsDimse.requests;
  const { Status } = dcmjsDimse.constants;

  const host = "www.dicomserver.co.uk";
  const port = 104;
  const callingAeTitle = "MY-SCU";
  const calledAeTitle = "ANY-SCP";
  let result = [];

  const client = new Client();
  const request = CFindRequest.createStudyFindRequest({
    PatientID: PatientID ?? "*",
    PatientName: PatientName ?? "*",
  });
  request.on("response", (response) => {
    if (response.getStatus() === Status.Pending && response.hasDataset()) {
      //   console.log(response.getDataset());
      result.push(response.getDataset());
    } else {
      res.statusCode = 200;
      res.json({ result });
    }
  });
  client.addRequest(request);
  client.send(host, port, callingAeTitle, calledAeTitle);

  return res;
}
