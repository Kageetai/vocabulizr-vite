import { CLOUDVISION, MAX_CLOUDVISION_RESULTS } from './constants';

const removeBase64Identifier = (b: string) =>
  b.replace('data:image/jpeg;base64,', '');

const parseJSON = (r: Response) => r.json();

export interface CVResponse {
  responses: Array<{
    labelAnnotations: Array<LabelAnnotation>;
  }>;
}

export interface LabelAnnotation {
  mid: string;
  description: string;
  score: number;
  topicality: number;
}

export async function postImage(image: string): Promise<LabelAnnotation[]> {
  const data = {
    requests: [
      {
        image: {
          content: removeBase64Identifier(image),
        },
        features: {
          type: 'LABEL_DETECTION',
          maxResults: MAX_CLOUDVISION_RESULTS,
        },
      },
    ],
  };

  return await fetch(CLOUDVISION, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(parseJSON)
    .then((body: CVResponse) => body.responses[0].labelAnnotations);
}
