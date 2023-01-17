import dcmjsDimse from "dcmjs-dimse";

const handler = (req, res) => {
  const { Client, Server, Scp, Dataset } = dcmjsDimse;
  const { CFindRequest } = dcmjsDimse.requests;
  const { Status } = dcmjsDimse.constants;
  const {
    query: { id },
  } = req;

  const host = "www.dicomserver.co.uk";
  const port = 104;
  const callingAeTitle = "MY-SCU";
  const calledAeTitle = "ANY-SCP";
  let result = [];

  const client = new Client();
  const request = CFindRequest.createSeriesFindRequest({
    StudyInstanceUID: id,
  });
  request.on("response", (response) => {
    if (response.getStatus() === Status.Pending && response.hasDataset()) {
      // console.log(response.getDataset());
      result.push(response.getDataset());
    } else {
      res.statusCode = 200;
      res.json({ result });
    }
  });
  client.addRequest(request);
  client.send(host, port, callingAeTitle, calledAeTitle);

  return res;
};

export default handler;
