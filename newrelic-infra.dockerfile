FROM newrelic/infrastructure:latest

RUN apk add --no-cache tini

COPY ./newrelic-infra.yml /etc/newrelic-infra.yml

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["/usr/bin/newrelic-infra"]
