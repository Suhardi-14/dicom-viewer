const dcmjsDimse = require("dcmjs-dimse");
const { Client } = dcmjsDimse;
const { CFindRequest } = dcmjsDimse.requests;
const { Status } = dcmjsDimse.constants;

const host = "www.dicomserver.co.uk";
const port = 104;
const callingAeTitle = "MY-SCU";
const calledAeTitle = "ANY-SCP";

const client = new Client();
const request = CFindRequest.createStudyFindRequest({
  PatientName: "Jan Nowak",
});
request.on("response", (response) => {
  if (response.getStatus() === Status.Pending && response.hasDataset()) {
    console.log(response.getDataset());
  }
});
client.addRequest(request);
client.send(host, port, callingAeTitle, calledAeTitle);
