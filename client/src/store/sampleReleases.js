export default [
  {
    name: 'helm-repository',
    namespace: 'endergy-tools',
    revision: '2',
    updated: '2020-02-16 00:50:10.253944 -0500 EST',
    status: 'pending',
    chart: 'helm-repo-0.1.0',
    app_version: 'latest'
  },
  {
    name: 'minio',
    namespace: 'common',
    revision: '1',
    updated: '2020-02-16 00:02:53.713009 -0500 EST',
    status: 'failed',
    chart: 'minio-5.0.7',
    app_version: 'master'
  },
  {
    name: 'nginx-ingress',
    namespace: 'kube-system',
    revision: '1',
    updated: '2020-02-03 03:19:58.201001064 +0000 UTC',
    status: 'deployed',
    chart: 'nginx-ingress-1.29.6',
    app_version: '0.28.0'
  },
  {
    name: 'postgresql',
    namespace: 'common',
    revision: '3',
    updated: '2020-02-16 00:23:11.884692 -0500 EST',
    status: 'deployed',
    chart: 'postgresql-8.3.4',
    app_version: '11.7.0'
  },
  {
    name: 'py-repo',
    namespace: 'endergy-tools',
    revision: '2',
    updated: '2020-02-16 00:59:44.89696 -0500 EST',
    status: 'deployed',
    chart: 'py-repo-0.1.0',
    app_version: 'latest'
  },
  {
    name: 'rabbitmq',
    namespace: 'common',
    revision: '1',
    updated: '2020-02-16 16:37:13.697055 -0500 EST',
    status: 'deployed',
    chart: 'rabbitmq-6.17.2',
    app_version: '3.8.2'
  }
]
