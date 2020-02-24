import YAML from 'yamljs'
export const sampleReleases = [
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

export const releaseHelmRepo = {
  name: 'helm-repository',
  last_deployed: 'Sun Feb 16 00:50:10 2020',
  namespace: 'endergy-tools',
  status: 'deployed',
  revision: 2,
  test_suite: 'None',
  user_supplied_values: YAML.parse(`
  password: ""
  resources:
    requests:
      cpu: 125m
      memory: 256Mi
`),
  computed_values: YAML.parse(`
  endergy-lib:
    global: {}
    hosts:
    - endergy.info
    - endergy.co
  fullnameOverride: ""
  image:
    pullPolicy: Always
    repository: chartmuseum/chartmuseum
  ingress:
    annotations: {}
    enabled: true
    hosts: []
    subdomain: helm
  lib:
    global: {}
    hosts:
    - endergy.info
    - endergy.co
  nameOverride: ""
  password: ""
  replicaCount: 1
  resources:
    requests:
      cpu: 125m
      memory: 256Mi
  service:
    port: 80
    type: ClusterIP
  user: endergy-automation
 `),
  hooks: undefined,
  manifest: [
    {
      source: 'helm-repo/templates/service.yaml',
      value: YAML.parse(`
  apiVersion: v1
  kind: Service
  metadata:
    name: helm-repository
    labels:
      helm.sh/chart: helm-repo-0.1.0
      app.kubernetes.io/name: helm-repo
      app.kubernetes.io/instance: helm-repository
      app.kubernetes.io/version: "latest"
      app.kubernetes.io/managed-by: Helm
  spec:
    type: ClusterIP
    ports:
      - port: 80
        targetPort: 8080
        protocol: TCP
        name: http
    selector:
      app.kubernetes.io/name: helm-repo
      app.kubernetes.io/instance: helm-repository`)
    },
    {
      source: 'helm-repo/templates/statefulset.yaml',
      value: YAML.parse(`
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: helm-repository
    labels:
      helm.sh/chart: helm-repo-0.1.0
      app.kubernetes.io/name: helm-repo
      app.kubernetes.io/instance: helm-repository
      app.kubernetes.io/version: "latest"
      app.kubernetes.io/managed-by: Helm
  spec:
    replicas: 1
    selector:
      matchLabels:
        app.kubernetes.io/name: helm-repo
        app.kubernetes.io/instance: helm-repository
    serviceName: helm-repository
    template:
      metadata:
        labels:
          app.kubernetes.io/name: helm-repo
          app.kubernetes.io/instance: helm-repository
      spec:
        containers:
          - name: helm-repo
            image: "chartmuseum/chartmuseum:latest"
            imagePullPolicy: Always
            env:
              - name: STORAGE
                value: local
              - name: STORAGE_LOCAL_ROOTDIR
                value: /charts
              - name: DEBUG
                value: "1"
              - name: ALLOW_OVERWRITE
                value: "1"
              - name: BASIC_AUTH_USER
                valueFrom:
                  secretKeyRef:
                    name: helm-repository
                    key: basic-auth-user
              - name: BASIC_AUTH_PASS
                valueFrom:
                  secretKeyRef:
                    name: helm-repository
                    key: basic-auth-pass
            ports:
              - name: http
                containerPort: 8080
                protocol: TCP
            livenessProbe:
              httpGet:
                path: /health
                port: http
            readinessProbe:
              httpGet:
                path: /health
                port: http
            resources:
              requests:
                cpu: 125m
                memory: 256Mi
            volumeMounts:
              - name: helm-data
                mountPath: /charts
        initContainers:
        - name: helm-data-setup
          image: busybox
          command: ["sh", "-c", "chown -R 1000:1000 /charts"]
          volumeMounts:
          - name: helm-data
            mountPath: /charts
    volumeClaimTemplates:
      - metadata:
          name: helm-data
        spec:
          accessModes: [ "ReadWriteOnce" ]
          resources:
            requests:
              storage: 5Gi`)
    },
    {
      source: 'helm-repo/templates/ingress.yaml',
      value: YAML.parse(`
  apiVersion: networking.k8s.io/v1beta1
  kind: Ingress
  metadata:
    name: helm-repository
    labels:
      helm.sh/chart: helm-repo-0.1.0
      app.kubernetes.io/name: helm-repo
      app.kubernetes.io/instance: helm-repository
      app.kubernetes.io/version: "latest"
      app.kubernetes.io/managed-by: Helm
  spec:
    rules:
      - host: "helm.endergy.info"
        http:
          paths:
            - path: "/"
              backend:
                serviceName: "helm-repository"
                servicePort: 80
      - host: "helm.endergy.co"
        http:
          paths:
            - path: "/"
              backend:
                serviceName: "helm-repository"
                servicePort: 80
`)
    }
  ]
}
